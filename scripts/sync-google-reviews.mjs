import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import "dotenv/config";

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.SERPAPI_API_KEY || process.env.NEXT_PUBLIC_SERPAPI_API_KEY;
// Safety caps (so you don't burn credits endlessly)
const MAX_PAGES = Number(process.env.MAX_REVIEW_PAGES || 60); // adjust if needed
const OUT_JSON = path.join(process.cwd(), "data", "google-reviews.json");
const AVATAR_DIR = path.join(process.cwd(), "public", "reviews", "avatars");
const DOWNLOAD_AVATARS = process.env.DOWNLOAD_AVATARS !== "false"; // default true

if (!PLACE_ID || !API_KEY) {
  console.error("Missing GOOGLE_PLACE_ID or SERPAPI_API_KEY in env");
  process.exit(1);
}

async function ensureDirs() {
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.mkdir(AVATAR_DIR, { recursive: true });
}

function sha1(input) {
  return crypto.createHash("sha1").update(String(input)).digest("hex");
}

function buildSerpUrl({ pageToken }) {
  const params = new URLSearchParams({
    engine: "google_maps_reviews",
    place_id: PLACE_ID,
    api_key: API_KEY,
    hl: "en",
    gl: "nz",
    no_cache: "true", // IMPORTANT: fetch fresh while syncing
    reviews_sort: "newest",
  });

  if (pageToken) params.set("next_page_token", pageToken);

  return `https://serpapi.com/search.json?${params.toString()}`;
}

// Create a stable-ish unique key for dedupe
function reviewKey(r) {
  const name = r?.user?.name || "";
  const snippet = r?.snippet || r?.text || "";
  const rating = r?.rating ?? "";
  const time = r?.date || r?.time || r?.iso_date || "";
  return sha1(`${name}|${rating}|${time}|${snippet}`.slice(0, 2000));
}

async function downloadImage(url, filePath) {
  if (!url) return false;
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, buf);
  return true;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchAllReviews() {
  let pageToken = null;
  let pagesFetched = 0;

  const byId = new Map(); // dedupe

  while (pagesFetched < MAX_PAGES) {
    const url = buildSerpUrl({ pageToken });

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const preview = (await res.text()).slice(0, 400);
      throw new Error(`SerpAPI HTTP ${res.status}: ${preview}`);
    }

    const data = await res.json();

    const reviews =
      data.reviews ||
      data.place_reviews ||
      data.reviews_results ||
      data.user_reviews ||
      data.local_reviews ||
      [];

    if (Array.isArray(reviews)) {
      for (const r of reviews) {
        byId.set(reviewKey(r), r);
      }
    }

    const next = data?.serpapi_pagination?.next_page_token;

    console.log(
      `Page ${pagesFetched + 1} fetched: +${
        Array.isArray(reviews) ? reviews.length : 0
      } reviews | total unique: ${byId.size} | next token: ${next ? "yes" : "no"}`,
    );

    pagesFetched += 1;

    if (!next) break;
    pageToken = next;

    // Small delay to be polite (and avoid bursts)
    await new Promise((r) => setTimeout(r, 600));
  }

  return Array.from(byId.values());
}

async function attachLocalAvatars(reviews) {
  if (!DOWNLOAD_AVATARS) return reviews;

  const processed = [];

  for (const r of reviews) {
    const remote = r?.user?.thumbnail || r?.user?.image || null;
    const name = r?.user?.name || "user";
    const id = sha1(remote || name).slice(0, 12);
    const fileName = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40)}-${id}.jpg`;
    const filePath = path.join(AVATAR_DIR, fileName);
    const localPath = `/reviews/avatars/${fileName}`;

    if (remote && !(await fileExists(filePath))) {
      const ok = await downloadImage(remote, filePath);
      if (!ok) {
        console.warn("Avatar download failed:", name, remote);
      }
    }

    processed.push({
      ...r,
      user: {
        ...r.user,
        thumbnail_remote: remote,
        thumbnail: remote ? localPath : null, // use local if we attempted download
      },
    });
  }

  return processed;
}

async function main() {
  await ensureDirs();

  console.log("Fetching reviews for place_id:", PLACE_ID);
  const reviews = await fetchAllReviews();

  const withAvatars = await attachLocalAvatars(reviews);

  const payload = {
    updatedAt: new Date().toISOString(),
    placeId: PLACE_ID,
    total: withAvatars.length,
    reviews: withAvatars,
  };

  await fs.writeFile(OUT_JSON, JSON.stringify(payload, null, 2), "utf8");

  console.log(`✅ Saved ${withAvatars.length} unique reviews to: ${OUT_JSON}`);
  console.log(
    `✅ Avatars dir: ${AVATAR_DIR} (DOWNLOAD_AVATARS=${DOWNLOAD_AVATARS})`,
  );
  console.log(`✅ Pages cap: MAX_PAGES=${MAX_PAGES}`);
}

main().catch((e) => {
  console.error("❌ Sync failed:", e);
  process.exit(1);
});
