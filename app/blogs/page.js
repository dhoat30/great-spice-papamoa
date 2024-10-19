import { getAllPosts, getOptions, getSinglePostData, getSinglePostDataWithID, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServiceSelectorTabs from '@/components/UI/Tabs/ServicesSelectorTabs/ServiceSelectorTabs'
import FaqAccordionSection from '@/components/UI/Layout/Sections/FaqAccordionSection'
import BlogsArchive from '@/components/Pages/BlogsPage/BlogsArchive'


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData("blogs", "/wp-json/wp/v2/pages")


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

export default async function Page() {

    const postData = await getSinglePostData("blogs", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }

    // get all blogs 
    const allBlogsData = await getAllPosts("wp-json/wp/v2/posts")



    return (
        <>
            <Header />
            <main>
                <BlogsArchive blogsData={allBlogsData} />

                <TechLogos data={options.clients_logos} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
                <FaqAccordionSection title={options.faq.section_title} description={options.faq.section_description} qaData={options.faq.items} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
