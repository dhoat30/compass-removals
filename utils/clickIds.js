const STORE_KEY = "ad_click_ids_v2";
const hasWindow = () => typeof window !== "undefined";
const hasDocument = () => typeof document !== "undefined";

function getCookie(name) {
  if (!hasDocument()) return "";
  const m = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return m ? decodeURIComponent(m[2]) : "";
}

// --- URL readers ---
// Read click IDs + UTMs + extra tracking params from the current URL
function readFromUrl() {
  if (!hasWindow()) return {};
  const sp = new URLSearchParams(window.location.search);
  const get = (key) => {
    const v = sp.get(key);
    return v || undefined;
  };

  return {
    // Google / Meta click IDs
    gclid: get("gclid"),
    gbraid: get("gbraid"),
    wbraid: get("wbraid"),
    fbclid: get("fbclid"),

    // Generic UTMs – work for both Google & Meta
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_campaign_id: get("utm_campaign_id"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),

    // Extra Google-ish bits (from Final URL suffix)
    utm_matchtype: get("utm_matchtype"),
    utm_network: get("utm_network"),
    utm_device: get("utm_device"),

    // Name params from custom parameters (Google) or manual UTMs
    campaign_name: get("campaign_name"),
    adgroup_name: get("adgroup_name"),
    ad_name: get("ad_name"),

    // Convenience aliases if you decide to use separate param names
    gads_campaign_id: get("gads_campaign_id") || get("utm_campaign_id"),
    gads_adgroup_id: get("gads_adgroup_id") || get("utm_adgroup_id"),
    gads_ad_id: get("gads_ad_id") || get("utm_ad_id"),

    // If you add these in FB URL params:
    fb_campaign_id: get("fb_campaign_id"),
    fb_adset_id: get("fb_adset_id"),
    fb_ad_id: get("fb_ad_id"),
    fb_platform: get("utm_platform") || get("platform"),
    fb_site_source: get("utm_site_source") || get("site_source_name"),
  };
}

// --- Cookie readers ---
// Google: gclid from _gcl_aw cookie
function readGoogleFromCookie() {
  const gcl = getCookie("_gcl_aw"); // format: GCL.XXXX.YYYY.<gclid>
  let gclid;
  if (gcl) {
    const parts = gcl.split(".");
    if (parts.length >= 4) gclid = parts[3];
  }
  return gclid ? { gclid } : {};
}

// Meta: fbp / fbc cookies
function readMetaFromCookie() {
  const fbp = getCookie("_fbp") || undefined;
  const fbc = getCookie("_fbc") || undefined;
  return { fbp, fbc };
}

// If URL has fbclid but _fbc is missing, construct it: fb.1.<ts>.<fbclid>
function buildFbcIfNeeded(ids) {
  if (ids.fbc) return ids.fbc;
  if (!ids.fbclid) return undefined;
  const ts = Math.floor(Date.now() / 1000);
  return `fb.1.${ts}.${ids.fbclid}`;
}

export function readFromStorage() {
  if (!hasWindow()) return {};
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function persist(ids) {
  if (!hasWindow()) return;
  const clean = Object.fromEntries(
    Object.entries(ids).filter(([, v]) => !!v)
  );
  localStorage.setItem(STORE_KEY, JSON.stringify(clean));
}

// Merge precedence: URL → Cookie → Storage
export function initClickIdsOnce() {
  const fromUrl = readFromUrl();
  const fromGoogleCookie = readGoogleFromCookie();
  const fromMetaCookie = readMetaFromCookie();
  const fromStorage = readFromStorage();

  const merged = {
    // --- Click IDs ---
    gclid: fromUrl.gclid || fromGoogleCookie.gclid || fromStorage.gclid,
    gbraid: fromUrl.gbraid || fromStorage.gbraid,
    wbraid: fromUrl.wbraid || fromStorage.wbraid,
    fbclid: fromUrl.fbclid || fromStorage.fbclid,
    fbp: fromMetaCookie.fbp || fromStorage.fbp,
    fbc: fromMetaCookie.fbc || fromStorage.fbc,

    // --- Generic UTMs ---
    utm_source: fromUrl.utm_source || fromStorage.utm_source,
    utm_medium: fromUrl.utm_medium || fromStorage.utm_medium,
    utm_campaign: fromUrl.utm_campaign || fromStorage.utm_campaign,
    utm_campaign_id: fromUrl.utm_campaign_id || fromStorage.utm_campaign_id,
    utm_content: fromUrl.utm_content || fromStorage.utm_content,
    utm_term: fromUrl.utm_term || fromStorage.utm_term,

    // --- Extra Google tracking ---
    utm_matchtype: fromUrl.utm_matchtype || fromStorage.utm_matchtype,
    utm_network: fromUrl.utm_network || fromStorage.utm_network,
    utm_device: fromUrl.utm_device || fromStorage.utm_device,
    campaign_name: fromUrl.campaign_name || fromStorage.campaign_name,
    adgroup_name: fromUrl.adgroup_name || fromStorage.adgroup_name,
    ad_name: fromUrl.ad_name || fromStorage.ad_name,
    gads_campaign_id:
      fromUrl.gads_campaign_id || fromStorage.gads_campaign_id,
    gads_adgroup_id:
      fromUrl.gads_adgroup_id || fromStorage.gads_adgroup_id,
    gads_ad_id: fromUrl.gads_ad_id || fromStorage.gads_ad_id,

    // --- Optional: explicit FB fields if you ever add them ---
    fb_campaign_id: fromUrl.fb_campaign_id || fromStorage.fb_campaign_id,
    fb_adset_id: fromUrl.fb_adset_id || fromStorage.fb_adset_id,
    fb_ad_id: fromUrl.fb_ad_id || fromStorage.fb_ad_id,
    fb_platform: fromUrl.fb_platform || fromStorage.fb_platform,
    fb_site_source: fromUrl.fb_site_source || fromStorage.fb_site_source,
  };

  // Create _fbc value if we only have fbclid
  merged.fbc = buildFbcIfNeeded(merged) || merged.fbc;

  persist(merged);
  return merged;
}