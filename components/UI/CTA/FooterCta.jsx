import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
// const Madala = dynamic(() => import("../Patterns/Madala"));

export default function FooterCta({ title, description, cta, lightCTA, image }) {
  return (
    <Section component="section" sx={{background: lightCTA ? "#EFDDB1" : "#000F30"}}>
      {image && 
      <div className="image-container">
  <div className={"image-wrapper"} style={{ paddingBottom: `${image.height / image.width * 100}%` }}>
        <Image src={image.url} alt={image.alt} fill quality={100}  style={{objectFit: 'cover'}} />
      </div>
      </div>
    } 
      <Container maxWidth="xl">
        <div className="wrapper">
          {/* <Madala className="pattern" /> */}
          <div className="content-wrapper">
           <Image
                         src="/logo.png"
                         width={96*1.7}
                         height={37*1.7}
                         alt={`Great Spice Papamoa Logo`}
                      
                       />
            <Typography
              component="h2"
              variant="h2"
                        className="title mt-16"
                 align="center"
                 color={lightCTA ? "#1D1D1D" : "white"}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
                 color={lightCTA ? "#1D1D1D" : "white"}
              className="description mt-16"
              align="center"
            >
              {description}
            </Typography>
            <div className="button-wrapper">
              <Link href={cta.url} target="_blank">
                <Button
                  size="large"
                  variant="contained"
                
                >
                  {cta.title}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
const Section = styled(Box)`
  padding: 40px 0;
  @media (max-width: 900px) {
    padding: 24px 0;
  }
  position: relative;
  .image-container{ 
    z-index: 10;
    width: 250px; 
    position: absolute;
    left: 0; 
    bottom: 0 ; 
    @media(max-width: 1100px){ 
      display: none;
    }
    .image-wrapper{ 
      z-index: 12;

    }
  }
  .wrapper {
    border-radius: 12px;
    max-width: 1100px;
    margin: 0 auto;
    align-items: center;
    display: flex;

    position: relative;
    overflow: hidden;
z-index: 15;
    .pattern {
      position: absolute;
      width: 100%;
      height: 100%;
      right: -50%;
      /* add rotation animation */
      animation: rotate 100s linear infinite;
      z-index: 0;
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      path {
        fill: #035369;
      }
    }
    .content-wrapper {
      position: relative;
      z-index: 2;
      padding: 80px 32px;
      max-width: 900px; 
      margin: 0 auto; 
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (max-width: 600px) {
        padding: 32px 16px;
      }
      .title {
      }
      .button-wrapper {
        margin-top: 32px;
        flex-wrap: wrap;
        display:flex; 
        justify-content: center;
      }
    }
    .image-wrapper {
      border: solid red;

      svg {
        /* add rotation animation */
        animation: rotate 100s linear infinite;
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
`;
