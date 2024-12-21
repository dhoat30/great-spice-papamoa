import { getOptions, getSinglePostData,getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import SmallGallery from '@/components/UI/Gallery/SmallGallery'
import GoogleReviewGridLayout from '@/components/UI/GoogleReviews/GoogleReviewGridLayout'
import BreadcrumbHero from '@/components/UI/Hero/BreadcrumbHero'

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData("testimonials", "/wp-json/wp/v2/menu")

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
                siteName: process.env.name,
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

export default async function Contact({ params }) {

    const postData = await getSinglePostData('testimonials', "/wp-json/wp/v2/pages")
    const galleryData = await getSinglePostData("gallery", "/wp-json/wp/v2/pages")
    const googleReviewsData = await getGoogleReviews()  
    console.log(postData)
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    return (
        <>
            <Header />
            <main>
                <BreadcrumbHero title={postData[0]?.acf.hero_section.title} description={postData[0]?.acf.hero_section.description} showBreadcrumb={false} showPattern={true} /> 
                <GoogleReviewGridLayout data={googleReviewsData}/> 
                <Layout sections={postData[0]?.acf?.sections} />

                <SmallGallery galleryData={galleryData[0].acf.gallery} title={galleryData[0].acf.hero_section.title} description={galleryData[0].acf.hero_section.description} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
