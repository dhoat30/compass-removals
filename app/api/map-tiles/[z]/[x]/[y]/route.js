// Keep CARTO_API_KEY on the server while Leaflet requests same-origin tiles.
export async function GET(request, { params }) {
  const { z, x, y } = await params;
  const tileY = /^(\d+)(@2x)?$/.exec(y);
  const zoom = Number(z);
  if (
    !/^\d+$/.test(z) || !/^\d+$/.test(x) || !tileY ||
    zoom > 19 || Number(x) >= 2 ** zoom || Number(tileY[1]) >= 2 ** zoom
  ) {
    return new Response("Invalid map tile", { status: 400 });
  }

  const key = process.env.CARTO_API_KEY?.trim();
  if (!key) {
    return new Response("Map tiles are not configured", { status: 503 });
  }

  const url = new URL(`https://basemaps.cartocdn.com/rastertiles/light_all/${z}/${x}/${y}.png`);
  url.searchParams.set("key", key);

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/png")) {
      return new Response("Map tile unavailable", { status: 502 });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    // Do not log upstream URLs: they contain the API key.
    return new Response("Map tile unavailable", { status: 502 });
  }
}
