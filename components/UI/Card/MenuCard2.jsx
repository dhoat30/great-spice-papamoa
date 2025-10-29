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
          className="body1 body1-dark description mt-40"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Div>
  );
}

const Div = styled.div`
 position: relative;

.image-container{ 
  padding: 0 24px; 
}
  .image-wrapper {
    overflow: hidden;
    position: relative;
z-index: 10;
    img {
      transition: transform 0.5s ease-in-out;
   
    }
  }
  .content-link-wrapper{ 
   
  
  }
  .content-wrapper {
    border-radius: 8px;
    position: relative;
    top: -150px; 
    bottom: 150px; 
   background: rgba(255, 255, 255, 0.40);
border: 2px solid rgba(255, 255, 255, 0.40);
@media (max-width: 1000px) {
  
    padding: 164px 16px 32px 16px;

}
@media (min-width: 1000px) {
      height: 450px;
    padding: 164px 32px 0 32px;

}
.description{ 
  text-align: center;
}

  }

`;
