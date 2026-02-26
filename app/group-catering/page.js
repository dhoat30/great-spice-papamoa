export const revalidate = 2592000; // applies to both page and metadata

import { getOptions, getSinglePostData } from "@/utils/fetchData";
import Layout from "@/components/UI/Layout/Layout";
import OptimizedHero from "@/components/UI/Hero/OptimizedHero/OptimizedHero";
import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import BackgroundImageHero from "@/components/UI/Hero/BackgroundImageHero/BackgroundImageHero";
import SmallGallery from "@/components/UI/Gallery/SmallGallery";
import GoogleReviewsCarousel from "@/components/UI/GoogleReviews/GoogleReviewsCarousel";
import reviewsData from "@/data/google-reviews.json";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  // fetch data
  const data = await getSinglePostData(
    "group-catering",
    "/wp-json/wp/v2/pages",
  );

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  if (data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData?.title,
      description: seoData?.description,
      metadataBase: new URL(process.env.siteUrl),
      alternates: {
        canonical: `${process.env.siteUrl}/group-catering`,
      },
      openGraph: {
        title: seoData?.title,
        description: seoData?.description,
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

export default async function Page() {
  const postData = await getSinglePostData(
    "group-catering",
    "/wp-json/wp/v2/pages",
  );
  // const galleryData = await getSinglePostData(
  //   "gallery",
  //   "/wp-json/wp/v2/pages",
  // );

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
        <BackgroundImageHero
          className="hero-desktop"
          data={postData[0]?.acf?.hero_section}
          heroUSP={options.hero_usp}
        />
        <OptimizedHero
          className="hero-mobile"
          data={postData[0]?.acf?.hero_section}
          heroUSP={options.hero_usp}
        />
        <Layout
          sections={postData[0]?.acf?.sections}
          comboDealsData={options.combo_specials}
          cateringPackagesData={options.catering_packages}
        />
        <GoogleReviewsCarousel data={reviewsData} />
        {/* <SmallGallery galleryData={galleryData[0].acf.gallery} title={galleryData[0].acf.hero_section.title} description={galleryData[0].acf.hero_section.description} /> */}
        {/* <Gallery galleryData={galleryData[0]} title={galleryData[0].acf.hero_section.title} description={galleryData[0].acf.hero_section.description} /> */}
        {/* <USP showTitle={true} statsArray={options?.stats?.items} cards={options?.usp?.items} title={options.usp?.section_title} description={options.usp?.section_description} /> */}
      </main>
      <Footer
        copyrightMarketStorey={true}
        tripAdvisorData={options.trip_advisor}
        lightCTA={false}
        footerCtaData={options.footer_cta_dark}
        certifications={options.certifications}
        contactInfo={options.contact_info}
        socialData={options.social_links}
      />
    </>
  );
}
