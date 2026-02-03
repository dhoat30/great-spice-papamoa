"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import NewsletterForm from "../Forms/NewsletterForm";
import { menus, usefulLinks, informationLinks } from "./FooterLinks";
import Map from "../Map/Map";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import TripAdvisorSection from "../Layout/Sections/TripAdvisorSection";
export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,
  contactInfo,
  socialData,
  showFooterMap = true,
  lightCTA = false,
  tripAdvisorData,
  copyrightMarketStorey,
}) {
  return (
    <>
      {tripAdvisorData && (
        <TripAdvisorSection
          title={tripAdvisorData.title}
          subtitle={tripAdvisorData.subtitle}
          logo={tripAdvisorData.logo}
          description={tripAdvisorData.description}
          link={tripAdvisorData.link}
          uspItems={tripAdvisorData.usp_items}
          image={tripAdvisorData.image}
        />
      )}
      {showFooterCta && footerCtaData && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          cta={footerCtaData.cta_link}
          image={footerCtaData.image}
          lightCTA={lightCTA}
        />
      )}

      <FooterSection>
        <ContainerStyled maxWidth="xl" className="row">
          {/* logo wrapper */}
          <div className="footer-wrapper">
            <div className="certification-wrapper">
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "8px" }}
              >
                Awards
              </Typography>
              <div className="certification-logos flex flex-wrap gap-8 align-center mt-24">
                {certifications?.cards.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      src={item.certification_image.url}
                      alt={item.alt ? item.alt : "certification"}
                      width={item.certification_image.width}
                      height={item.certification_image.height}
                    />
                  );
                })}
              </div>
              <div className="newsletter-wrapper mt-40">
                <Typography variant="h6" component="div">
                  Subscribe Now
                </Typography>
                <Typography variant="body1" component="div" className="mt-8">
                  Signup to get events & promotion info every month.{" "}
                </Typography>
                <NewsletterForm
                  className="newsletter-form"
                  formName="Newsletter Form"
                  formType="newsletter-form"
                  emailRoute={"/api/newsletter-hubspot"}
                  emailTo={process.env.MAILGUN_TO_EMAIL}
                  btnLabel="Subscribe"
                />
              </div>
              <div className="social-wrapper mt-24 ">
                <Typography variant="h6" component="div">
                  Follow Us
                </Typography>
                <div className="social-links mt-8 flex gap-4">
                  {socialData &&
                    socialData.length > 0 &&
                    socialData.map((social, index) => {
                      return (
                        <Link
                          key={index}
                          aria-label={social.social_media_name}
                          href={social.link}
                          target="_blank"
                        >
                          <Image
                            src={social.social_media_icon.url}
                            alt={social.social_media_name}
                            width="32"
                            height="32"
                          />
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="footer-useful-links links-container">
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "8px" }}
              >
                Menus
              </Typography>
              <ul component="ul" sx={{ margin: 0, padding: 0 }}>
                {menus.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className="body2"
                        target={link.target && link.target}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="footer-useful-links links-container">
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "8px" }}
              >
                Useful Links
              </Typography>
              <ul component="ul" sx={{ margin: 0, padding: 0 }}>
                {usefulLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className="body2"
                        target={link.target && link.target}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="contact-wrapper">
              <div className="contact-section">
                <ContactInfo contactInfo={contactInfo} />
              </div>
            </div>
            <div className="map-wrapper">
              <Map />
            </div>
          </div>
        </ContainerStyled>
      </FooterSection>
      {/* copyright container */}
      <Copyright copyrightMarketStorey={copyrightMarketStorey} />
    </>
  );
}
const FooterSection = styled.section`
  padding: 40px 0;
  background: var(--dark-surface-container-lowest);
  @media (max-width: 900px) {
    padding: 32px 0;
  }
`;
const ContainerStyled = styled(Container)`
  .footer-wrapper {
    display: grid;
    gap: 32px;
    justify-content: space-between;
    grid-template-columns: 300px auto auto auto auto;
    align-items: start;
    @media (max-width: 1366px) {
      gap: 24px;
    }
    @media (max-width: 1250px) {
      grid-template-columns: 300px 1fr 1fr 1fr;
    }
    @media (max-width: 1000px) {
      gap: 32px;
      grid-template-columns: 300px 1fr 1fr;
    }
    @media (max-width: 800px) {
      gap: 32px;
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
      gap: 24px;
      grid-template-columns: 1fr;
    }
    .links-container {
      ul {
        list-style: none !important;
        a {
          display: block;
          margin: 0;
          padding: 6px 0;
          &:hover {
            color: var(--dark-primary);
          }
        }
      }
    }
  }
  .social-wrapper {
    margin-top: 24px;
    .social-links {
      a {
        margin: 0 8px 0 0;
        &:hover {
          svg {
            path {
              fill: var(--dark-primary);
            }
          }
        }
      }
    }
  }
  .contact-wrapper {
    /* @media (max-width: 900px) {
      grid-column: span 2;
    } */
  }
`;
