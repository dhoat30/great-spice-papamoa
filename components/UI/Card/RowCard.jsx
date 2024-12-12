import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@estyled";
import Image from "next/image";

import TextLink from "../CTA/TextLink";

export default function RowCard({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
}) {

  return (
    <Container
      className={`${className} row`}
     
    >
      <div className="bulb" ></div>
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
            component={p}
            variant="h6"
            className="description "
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
          
          />

          <TextLink label={ctaLabel} url={ctaLink} className="cta" />
        </Box>
        <div
        
          className="image-wrapper"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            priority
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
  }
  .wrapper {
    padding: 24px 0 0 0;
    border-radius: 12px;
    border: 1px solid #353438;
    background: rgba(53, 52, 56, 0.1);
    backdrop-filter: blur(7.599999904632568px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    align-items: center;
    justify-content: space-between;

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
        margin: 16px 0 0 0;
        p {
          margin-bottom: 24px;
          strong {
            font-weight: 500;
            color: var(--dark-secondary);
          }
        }
      }
      .cta {
      }
    }
    .image-wrapper {
      position: relative;
      width: 100%;

      img {
        object-fit: cover;
        border-radius: 12px;
      }
    }
  }
`;
