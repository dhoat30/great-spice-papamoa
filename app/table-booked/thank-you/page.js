export const revalidate = 2592000; // applies to both page and metadata

import Header from "@/components/UI/Header/Header";
import ThankYou from "@/components/UI/ThankYou/ThankYou";

export const metadata = {
  metadataBase: new URL(process.env.siteUrl),
  title: "Thank You",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function Page() {
  return (
    <>
      <Header />
      <main>
        <ThankYou
          title="Thank You for Your Reservation"
          description="Thank you for reserving your table at Great Spice Indian Restaurant. We look forward to welcoming you and providing an authentic Indian dining experience. If you have any questions or special requests, feel free to get in touch with us. See you soon!"
        />
      </main>
    </>
  );
}
