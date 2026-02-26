export const revalidate = 2592000; // applies to both page and metadata

import {
  getOptions,
  getSinglePostData,
  getSingleServicePackage,
} from "@/utils/fetchData";
import Layout from "@/components/UI/Layout/Layout";
import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import ContactHero from "@/components/UI/Hero/OptimizedHero/ContactHero";
import SmallGallery from "@/components/UI/Gallery/SmallGallery";
import BreadcrumbHero from "@/components/UI/Hero/BreadcrumbHero";
import Script from "next/script";
import ReservationForm from "@/components/UI/Forms/ReservationForm";
import GoogleReviewsCarousel from "@/components/UI/GoogleReviews/GoogleReviewsCarousel";
import reviewsData from "@/data/google-reviews.json";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  // fetch data
  const data = await getSinglePostData("reservation", "/wp-json/wp/v2/pages");

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  if (data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData.title,
      description: seoData.description,
      metadataBase: new URL(process.env.siteUrl),
      alternates: {
        canonical: `${process.env.siteUrl}/reservation`,
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
    "reservation",
    "/wp-json/wp/v2/pages",
  );
  const options = await getOptions();
  const galleryData = await getSinglePostData(
    "gallery",
    "/wp-json/wp/v2/pages",
  );

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
          title={postData[0].acf.hero_section.title}
          description={postData[0].acf.hero_section.description}
        />
        <ReservationForm />
        <Layout sections={postData[0]?.acf?.sections} />
        <GoogleReviewsCarousel data={reviewsData} />

        <SmallGallery
          galleryData={galleryData[0].acf.gallery}
          title={galleryData[0].acf.hero_section.title}
          description={galleryData[0].acf.hero_section.description}
        />
      </main>
      <Footer
        footerCtaData={options.footer_cta}
        certifications={options.certifications}
        contactInfo={options.contact_info}
        socialData={options.social_links}
        showFooterCta={false}
      />
    </>
  );
}
