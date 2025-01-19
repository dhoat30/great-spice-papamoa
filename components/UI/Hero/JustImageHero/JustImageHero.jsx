import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
export default function JustImageHero({
  desktopImage,
  mobileImage,
  ctaArr,
  heroTitleImage,
  description,
}) {
  const matches = useMediaQuery("(min-width:500px)");
  const imagePadding = matches
    ? (desktopImage?.height / desktopImage?.width) * 100
    : (mobileImage?.height / mobileImage?.width) * 100;
  const shouldOpenInNewTab = ctaArr[0]?.cta?.url.includes("reservation");

  const buttonArr =
    ctaArr.length > 1 &&
    ctaArr.map((item, index) => {
      const shouldOpenInNewTab = item.cta?.url.includes("reservation");

      return (
        <Link
          key={index}
          href={item.cta.url}
          target={shouldOpenInNewTab ? "_blank" : "_self"}
        >
          <Button
            variant="contained"
            size="large"
            className={`button-${index + 1}`}
          >
            {" "}
            {item.cta.title}
          </Button>
        </Link>
      );
    });
  return (
    <>
      {/* check if only one cta then show the whole poster */}
      {ctaArr.length > 0 && ctaArr.length === 1 ? (
        <Section
          href={ctaArr[0]?.cta?.url}
          target={shouldOpenInNewTab ? "_blank" : "_self"}
        >
          <div
            className="desktop-image image-wrapper"
            style={{
              paddingBottom: `${
                (desktopImage?.height / desktopImage?.width) * 100
              }%`,
            }}
          >
            <Image
              src={desktopImage?.url}
              alt={desktopImage.alt}
              fill
              quality={100}
            />
          </div>
          <div
            className="mobile-image image-wrapper"
            style={{
              paddingBottom: `${
                (mobileImage?.height / mobileImage?.width) * 100
              }%`,
            }}
          >
            <Image
              src={mobileImage?.url}
              alt={mobileImage.alt}
              fill
              quality={100}
            />
          </div>
        </Section>
      ) : null}

      {ctaArr.length > 0 && ctaArr.length > 1 && (
        <SectionWithMoreCTA>
          <Container maxWidth="xl" className="container">
            <div className="content-wrapper">
              <div
                className="image-wrapper title-image"
                style={{
                  paddingBottom: `${
                    (heroTitleImage?.height / heroTitleImage?.width) * 100
                  }%`,
                }}
              >
                <Image
                  src={heroTitleImage?.url}
                  alt={heroTitleImage.alt}
                  fill
                  quality={100}
                />
              </div>
              <div
                className="description body1 mt-24"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              <div className="button-wrapper mt-24 flex gap-16">
                {buttonArr}
              </div>
            </div>
          </Container>
            <Image
              src={desktopImage?.url}
              alt={desktopImage.alt}
              fill
              quality={100}
              objectFit="cover"
              className="desktop-image"

            />
             <Image
              src={mobileImage?.url}
              alt={mobileImage.alt}
              fill
              quality={100}
              objectFit="cover"
              className="mobile-image"
              
            />
        </SectionWithMoreCTA>
      )}
    </>
  );
}
const Section = styled(Link)`
  position: relative;
  width: 100%;
  display: block;
  .desktop-image {
    display: none;
    @media (min-width: 600px) {
      display: block;
    }
  }
  .mobile-image {
    @media (min-width: 600px) {
      display: none;
    }
  }
`;

const SectionWithMoreCTA = styled.section`
  padding-top: 120px; 
  position: relative;
  padding-bottom: 56.25%; 
  @media(max-width: 700px) {
    padding-bottom: 120%; 

  } 
  .desktop-image {
    display: none;
    @media (min-width: 700px) {
      display: block;
    }
  }
  .mobile-image {
    @media (min-width: 700px) {
      display: none;
    }
  }
  .container {
    .content-wrapper {
      position: absolute;
      top: 50%; 
      transform: translateY(-50%);
      z-index: 10;
      width: 40%;
      @media(max-width: 700px) {
        width: calc(100% - 24px);


  } 
      .button-wrapper {
        flex-direction: column;
        max-width: 300px;
        .button-1 {
          background: #ff9200 !important;
          border: 1px solid #ff9200 !important;
        }
        .button-2 {
          background: white !important;
          border: 1px solid white !important;
        }
        button {
          border-radius: 50px;
          width: 100%;
          padding-left: 12px;
          padding-right: 12px;
        }
      }
    }
  }
`;
