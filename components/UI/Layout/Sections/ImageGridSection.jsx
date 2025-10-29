import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function ImageGridSection({
  title,
  description,
  mainImage,
  images,
  link,
}) {
    console.log("images", images);
  return (
    <Section>
      <Container maxWidth="lg" className="container">
        <div className="row-wrapper grid gap-32">
          <div
            className="desktop-image-wrapper image-wrapper main-image"
            style={{
              paddingBottom: `${(mainImage.height / mainImage.width) * 100}%`,
               borderRadius: "8px",
            }}
          >
            <Image src={mainImage.url} alt={mainImage.alt} fill />
          </div>
          <div className="content-wrapper">
          
            <div className="title h2" dangerouslySetInnerHTML={{ __html: title }}>

            </div>
            <div
            className="mobile-image-wrapper image-wrapper main-image mt-24"
            style={{
              paddingBottom: `${56}%`,
               borderRadius: "8px",
            }}
          >
            <Image src={mainImage.url} alt={mainImage.alt} fill quality={100} />
          </div>
            <Typography
              variant="body1"
              component="p"
              className="description mt-48"
              color={"#1D1D1D"}
            >
            
              {description}
            </Typography>
            <div className="mt-48">  
              <Link href={link.url} >
                <Button variant="contained" color="primary">
                {link.title}
                </Button>   
            </Link>
            </div>
      
          </div>
        </div>
        <div className={"images-row-wrapper grid gap-16 mt-16"}>
            {images && images.length > 0 && images.map((img, index) => (
              <div
                key={index}
                className="image-wrapper"
                style={{
                  paddingBottom: `${80}%`,
                  borderRadius: "8px",
                }}
              >
                <Image 
                quality={100}
                sizes="(max-width: 600px) 100vw, 25vw"
                src={img.image.url} alt={img.image.alt} fill sx={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
  background: var(--light-surface-container-lowest);
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .container {
    .row-wrapper {
      grid-template-columns: 400px 1fr;
      align-items: center;
        @media(max-width:1000px ) { 
      grid-template-columns:  1fr;
      text-align: center;
        }
      .desktop-image-wrapper{ 
        display: block; 
        @media(max-width:1000px ) { 
            display: none; 
        }
      }
        .mobile-image-wrapper{ 
        display: none; 
        @media(max-width:1000px ) { 
            display: block; 
        }
      }
    }
    .images-row-wrapper{ 
        grid-template-columns: 400px 1fr 1fr 1fr;
          @media(max-width:1000px ) { 
            display: none; 
        }
    }
  }
`;
