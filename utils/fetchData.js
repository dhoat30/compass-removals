//get single post with slug
export const getSinglePostData = async (slug, apiRoute) => {
    let response = await fetch(
      `${process.env.url}/${apiRoute}?slug=${slug}&acf_format=standard`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await response.json();
    return data;
  };
  
  // get single post data using post id
  export const getSinglePostDataWithID = async (id, apiRoute) => {
    let response = await fetch(
      `${process.env.url}/${apiRoute}/${id}?acf_format=standard`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await response.json();
    return data;
  };
  
  //get all posts
  export const getAllPosts = async (apiRoute) => {
    let response = await fetch(
      `${process.env.url}/${apiRoute}?acf_format=standard&per_page=100`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await response.json();
    return data;
  };
  
  export const getOptions = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/options/all`, {
      next: { revalidate: 604800 },
    });
    let data = await fetchData.json();
    return data;
  };
  
  // get reivews
  export const getGoogleReviews = async () => {
      const baseUrl = process.env.siteUrl; // Change this in production
      console.log("base url")

      console.log(baseUrl)
      const res = await fetch(`${baseUrl}/api/google-reviews`, { next: { revalidate: 2592000 } });
  
      if (!res.ok) { 
          console.log("failed to retch")
      return []
      }
      return res.json();
    
  };
  
  
  //get projects
  // export const getProjects = async () => {
  //     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?acf_format=standard&per_page=100`, {
  //         next: { revalidate: 604800 },
  //     });
  //     let data = await fetchData.json();
  //     return data
  // }
  
  //fetch work categories
  // export const getProjectCategories = async () => {
  //     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work-category`, {
  //         next: { revalidate: 604800 },
  //     });
  //     let data = await fetchData.json();
  //     return data
  // }
  
  // fetch single project
  // export const getSingleProject = async (slug) => {
  //     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?slug=${slug}&acf_format=standard`, {
  //         next: { revalidate: 604800 },
  //     });
  //     let data = await fetchData.json();
  //     return data
  // }
  
  //get service packages
  export const getCommercialServices = async () => {
    let fetchData = await fetch(
      `${process.env.url}/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await fetchData.json();
    return data;
  };
  
  export const getSingleCommercialService = async (slug) => {
    let fetchData = await fetch(
      `${process.env.url}/wp-json/wp/v2/commercial-cleaning?slug=${slug}&acf_format=standard`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await fetchData.json();
    return data;
  };
  // get single service package
  
  // get all blogs
  export const getBlogsData = async () => {
    let fetchData = await fetch(
      `${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await fetchData.json();
    return data;
  };
  // get single blog data
  export const getSingleBlog = async (slug) => {
    let fetchData = await fetch(
      `${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`,
      {
        next: { revalidate: 604800 },
      }
    );
    let data = await fetchData.json();
    return data;
  };
  



//   import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const placeId = process.env.GOOGLE_PLACE_ID;
//     const apiKey = process.env.SERPAPI_API_KEY;

//     if (!placeId || !apiKey) {
//       return NextResponse.json({ error: 'Missing SERPAPI_API_KEY or GOOGLE_PLACE_ID' }, { status: 400 });
//     }

//     const apiUrl = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${placeId}&api_key=${apiKey}`;

//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error(`SerpApi request failed: ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Optional: limit to 12 newest reviews
//     const reviews = (data.reviews || []);

//     return NextResponse.json(reviews, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching Google reviews:', error);
//     return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
//   }
// }

// // You likely don't need POST in this case — removing for now
