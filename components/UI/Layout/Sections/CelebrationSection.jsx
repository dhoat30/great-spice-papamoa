import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
export default function CelebrationSection({ title, description, images }) {
  return (
    <Section>
      <Container maxWidth="lg" className="container ">
        <div className="title-wrapper grid gap-64">
          <Image
            src="/logo.png"
            width={96 * 2}
            height={37 * 2} 
            alt={`${process.env.name} Logo`}
            style={{ cursor: "pointer" }}
          />
          <div className="title-description-wrapper mt-8">
            <Typography variant="h4" component="h2" >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body1"
                component="p"
                className="description mt-16"
              >
                {description}
              </Typography>
            )}
          </div>
        </div>
        <div className="images-container grid gap-24 mt-56">
            {images.map((item, index) => {
                
                return (
                <div key={index} className="image-wrapper border-radius-12" style={{ paddingBottom: `${item.image.height / item.image.width * 100}%` }}>
                    <Image src={item.image.url} alt={item.image.alt || `Celebration Image ${index + 1}`} fill />
                </div> ) 
})}
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
padding: 80px 0 80px 0;
@media (max-width: 768px) {
  padding: 40px 0 40px 0;
}
.container{ 
    .title-wrapper { 
        grid-template-columns: auto 1fr;
        align-items: center;
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            text-align: center;
            justify-items: center;
            gap: 16px; 
        }
    }
    .images-container{ 
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
    @media (max-width: 768px) {
        margin-top: 24px; 
            gap: 8px; 
        }
    }
}
`;
