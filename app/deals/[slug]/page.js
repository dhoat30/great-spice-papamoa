export const revalidate = 2592000; // applies to both page and metadata

import { getOptions, getSinglePostData } from "@/utils/fetchData";
import Layout from "@/components/UI/Layout/Layout";
import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  // fetch data
  const data = await getSinglePostData(slug, "/wp-json/wp/v2/deals", 2);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  if (data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData.title,
      description: seoData.description,
      metadataBase: new URL(process.env.siteUrl),
      alternates: {
        canonical: `${process.env.siteUrl}/deals/${params.slug}`,
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

export default async function Contact({ params }) {
  const slug = params.slug;

  const postData = await getSinglePostData(slug, "/wp-json/wp/v2/deals", 2);

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
        <Layout sections={postData[0]?.acf?.sections} />
      </main>
      <Footer
        showFooterCta={false}
        showFooterMap={false}
        footerCtaData={options.footer_cta}
        certifications={options.certifications}
        contactInfo={options.contact_info}
        socialData={options.social_links}
      />
    </>
  );
}
