export const revalidate = 2592000; // 30 days

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.SERPAPI_API_KEY;

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing SERPAPI_API_KEY or GOOGLE_PLACE_ID' },
        { status: 400 }
      );
    }

    let allReviews = [];
    let pageToken = null;
    let pageCount = 0;
    const maxPages = 5;

    while (pageCount < maxPages) {
      let apiUrl = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${placeId}&api_key=${apiKey}&hl=en`;
      if (pageToken) {
        apiUrl += `&next_page_token=${pageToken}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`SerpApi request failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data.reviews)) {
        allReviews = allReviews.concat(data.reviews);
      }

      // Check for next page token
      if (
        data.serpapi_pagination &&
        data.serpapi_pagination.next_page_token
      ) {
        pageToken = data.serpapi_pagination.next_page_token;
        pageCount++;
      } else {
        break; // No more pages
      }
    }

    return NextResponse.json(allReviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
