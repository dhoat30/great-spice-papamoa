import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export default function MenuCard2({ title, description, image, cta }) {
  if (!image) return null;

  let calculatedPaddingBottom = (image.height / image.width) * 100;

  return (
    <Div>
      <div className="image-container">
        <div
          className="image-wrapper"
          style={{ paddingBottom: `${calculatedPaddingBottom}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>
      </div>

      <div className="content-wrapper">
        <Typography
          variant="h5"
          component="h3"
          className="title mt-8"
          align="center"
          color={"#1D1D1D"}
        >
          {title}
        </Typography>

        <div
          className="body1 body1-dark description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%; /* 👈 ensures full equal height inside slider */
  @media(min-width: 1024px){
min-height: 600px;
  }
  .image-container {
    padding: 0 24px;
    flex-shrink: 0;
  }

  .image-wrapper {
    overflow: hidden;
    position: relative;
    z-index: 10;
    border-radius: 8px;
    img {
      object-fit: cover;
      object-position: center top;
      transition: transform 0.5s ease-in-out;
    }
  }

  .content-wrapper {
 flex: 1; /* 👈 allows content to grow evenly */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    margin-top: -120px; /* 👈 replaces top offset (relative to image height) */
    padding: 140px 16px 24px 16px;
    background: rgba(255, 255, 255, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 8px;
    box-sizing: border-box;

    .description {
      text-align: center;
      margin-top: 8px;
    }
  }
`;
