import {
  getOptions,
  getSinglePostData,
  getAllPosts,
  getSingleServicePackage,
} from "@/utils/fetchData";
import Layout from "@/components/UI/Layout/Layout";
import TechLogos from "@/components/UI/TechLogos/TechLogos";
import USP from "@/components/UI/USP/USP";
import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import BreadcrumbHero from "@/components/UI/Hero/BreadcrumbHero";

import VideoGallery from "@/components/UI/Gallery/VideoGallery";
export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  // fetch data
  const data = await getSinglePostData("video-gallery", "/wp-json/wp/v2/pages");

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  if (data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData.title,
      description: seoData.description,
      metadataBase: new URL(process.env.siteUrl),
      alternates: {
        canonical: `${process.env.siteUrl}/gallery/video-gallery`, 
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
          },
          {
            url: seoData?.og_image && seoData?.og_image[0].url,
            width: 1800,
            height: 1600,
          },
        ],
        type: "website",
      },
    };
  }
}

export default async function Contact() {
  const postData = await getSinglePostData(
    "video-gallery",
    "/wp-json/wp/v2/pages"
  );
  const options = await getOptions();
  if (!postData) {
    return {
      notFound: true,
    };
  }
  return (
    <>
      <Header />
      <main>
        <BreadcrumbHero
          title={postData[0]?.acf?.hero_section?.title}
          description={postData[0]?.acf?.hero_section?.description}
          showBreadcrumb={false}
        />
        <VideoGallery galleryData={postData[0]?.acf.gallery} />
        <Layout sections={postData[0]?.acf?.sections} />
      </main>
      <Footer
        footerCtaData={options.footer_cta}
        certifications={options.certifications}
        contactInfo={options.contact_info}
        socialData={options.social_links}
      />
    </>
  );
}
