import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Image from "next/image";

import TextLink from "../CTA/TextLink";
import ScrollableTabs from "@/components/UI/Tabs/ScrollableTabs";

export default function RowCardTabs({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
  tabsData,
}) {
  
  return (
    <Container
      className={`${className} row`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bulb" animate={controls}></div>
      <div className="wrapper">
        <Box className="content-wrapper">
          <Typography
            component={h2}
            variant="h4"
            color="white"
            className=" title"
      
          >
            {title}
          </Typography>
          <Typography
           
            variant="h6"
            component={p}
            className="description "
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {ctaLink && (
            <TextLink label={ctaLabel} url={ctaLink} className="cta" />
          )}
          <div
           
          >
            <ScrollableTabs tabsData={tabsData} />
          </div>
        </Box>
        <div
         
          className="image-wrapper"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            sizes="(max-width: 1080px) 100vw, 50vw "
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled(div)`
  cursor: pointer;
  position: relative;
  z-index: 1;
  width: 100%;
  grid-column: span 2;
  .bulb {
    position: absolute;
    z-index: -2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    width: 0%;
    height: 0%;
    background: radial-gradient(
      circle,
      rgba(85, 24, 167, 1) 0%,
      rgba(139, 49, 198, 1) 100%
    ); // Apply gradient here
    opacity: 0; // Start with hidden gradient
    transition: opacity 0.2s ease-in-out; // Smooth tr
  }
  .wrapper {
    padding: 24px 0 0 0;
    border-radius: 12px;
    border: 1px solid #353438;
    background: rgba(53, 52, 56, 0.41);
    backdrop-filter: blur(7.599999904632568px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    align-items: flex-end;
    @media (max-width: 1080px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 0 0 0 0;
      gap: 16px;
    }
    .content-wrapper {
      padding: 40px 32px;
      @media (max-width: 600px) {
        padding: 32px 16px 16px 16px;
      }
      .description {
        padding: 16px 0;
        p {
          margin-bottom: 24px;
          strong {
            font-weight: 500;
            color: var(--dark-secondary);
          }
        }
      }
      .cta {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      img {
        object-fit: cover;
      }
    }
  }
`;
