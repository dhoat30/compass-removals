export const revalidate = 2592000; // applies to both page and metadata

import Header from '@/Components/UI/Header/Header'
import {getSinglePostData} from '@/utils/fetchData'
import Footer from '@/Components/UI/Footer/Footer'
import Layout from '@/Components/UI/Layout/Layout'
import GoogleReviewsCarousel from '@/Components/UI/GoogleReviews/GoogleReviewsCarousel'
import reviewsData from "@/data/google-reviews.json";



export async function generateMetadata(props, parent) {
    const params = await props.params;
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData( 'compass-removals', '/wp-json/wp/v2/moving-company')

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL(process.env.siteUrl),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: process.env.siteUrl,
                siteName: process.env.siteName,
                images: [
                    {
                        url: seoData?.og_image && seoData?.og_image[0]?.url,
                        width: 800,
                        height: 600,
                    }, {
                        url: seoData?.og_image && seoData?.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },

                ],
                type: 'website',
            },
        }
    }
}

  export default async function Home() {
    const data = await getSinglePostData( 'compass-removals', '/wp-json/wp/v2/moving-company')
    if(!data) return {notFound: true}
    const sections = data[0]?.acf?.layout
    return (
        <>
            <Header />
            <main>

            <Layout sections={sections}  googleReviewsData={reviewsData}
/>
                {/* <Layout sections={postData[0]?.acf?.sections} /> */}
                {/* <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} /> */}
            

            </main>
            <Footer showFooterCta={true} footerCtaData={{title: "Book Your Move with Confidence", description: "Don’t risk delays, damage, or surprise costs on moving day. Choose a professional moving team that shows up on time and does the job right.", cta_link: {url: "/", title: "GET A QUOTE"}}  }/>
        </>
    )
}
