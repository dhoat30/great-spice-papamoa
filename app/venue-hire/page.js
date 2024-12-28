import { getOptions, getSinglePostData, getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import SmallGallery from '@/components/UI/Gallery/SmallGallery'
import BackgroundImageHero from '@/components/UI/Hero/BackgroundImageHero/BackgroundImageHero'
import Testimonials from '@/components/UI/Testimonials/Testimonials'
import FaqAccordionSection from '@/components/UI/Layout/Sections/FaqAccordionSection'
import GoogleReviewsCarousel from '@/components/UI/GoogleReviews/GoogleReviewsCarousel'

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData("venue-hire", "/wp-json/wp/v2/pages")

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL(process.env.siteUrl),
            alternates: {
                canonical: `${process.env.siteUrl}/venue-hire`, 
              },
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

export default async function Contact() {

    const postData = await getSinglePostData("venue-hire", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    const galleryData = await getSinglePostData("gallery", "/wp-json/wp/v2/pages")
    // google reviews data fetch 
    const googleReviewsData = await getGoogleReviews()  
    if (!postData) {
        return {
            notFound: true,
        }
    }
    const contactInfo = options.contact_info
    return (
        <>
            <Header />
            <main>
                <BackgroundImageHero className="hero-desktop" data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} />
                <OptimizedHero className="hero-mobile" data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} />

                <Layout sections={postData[0]?.acf?.sections} comboDealsData={options.combo_specials} cateringPackagesData={options.catering_packages} />
                <GoogleReviewsCarousel data={googleReviewsData}/> 
            
                {/* <FaqAccordionSection title={options?.faq?.section_title} description={options.faq?.section_description} qaData={options.faq?.items} /> */}

                <SmallGallery galleryData={galleryData[0].acf.gallery} title={galleryData[0].acf.hero_section.title} description={galleryData[0].acf.hero_section.description} />

            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
