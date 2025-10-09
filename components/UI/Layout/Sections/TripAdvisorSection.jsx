import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function TripAdvisorSection({
  image,
  title,
  subtitle,
  logo,
  description,
  link,
  uspItems,
  className,
}) {
  return (
    <Section>
      <Container maxWidth="lg" className="container">
        <div className={"content-wrapper"}>
          <div className="logo-wrapper">
            <Image src={logo.url} alt={logo.alt} width={128*2} height={27*2} />
          </div>
          <Typography variant="subtitle1" component="div" className="mt-8">
            {subtitle}
          </Typography>
          <Typography variant="h3" component="h2" className="mt-8">
            {title}
          </Typography>

          {/* usp items starts  */}
          {uspItems && uspItems.length > 0 && (
            <div className="usp-items mt-16 flex gap-16 flex-wrap">
              {uspItems.map((item, index) => (
                <div key={index} className="usp-item flex align-center gap-8 ">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2091 0.438365L13.5647 5.79737C13.7449 6.20759 14.1352 6.48863 14.5832 6.52878L20.3218 7.04199C20.9711 7.13625 21.2301 7.9305 20.7593 8.38785L16.4366 12.01C16.0866 12.3032 15.9273 12.7641 16.0236 13.2092L17.2801 19.0762C17.3904 19.7203 16.7131 20.2126 16.1321 19.9071L11.1233 16.9815C10.7383 16.7563 10.2623 16.7563 9.87724 16.9815L4.86848 19.9054C4.2892 20.2091 3.61016 19.7186 3.72042 19.0744L4.97698 13.2075C5.07149 12.7623 4.91398 12.3015 4.56396 12.0082L0.23948 8.3896C-0.229545 7.934 0.0294688 7.138 0.677003 7.04374L6.41556 6.53053C6.86358 6.49038 7.25385 6.20934 7.43411 5.79912L9.78974 0.440111C10.082 -0.146412 10.9185 -0.146412 11.2091 0.438365Z"
                      fill="#FDD835"
                    />
                    <path
                      d="M11.0376 6.11857L10.6385 2.17001C10.6228 1.95006 10.5773 1.57301 10.9308 1.57301C11.2108 1.57301 11.3631 2.1543 11.3631 2.1543L12.5601 5.32432C13.0117 6.53053 12.8262 6.94424 12.3904 7.18862C11.8899 7.46792 11.1513 7.24972 11.0376 6.11857Z"
                      fill="#FFFF8D"
                    />
                    <path
                      d="M15.9746 11.6591L19.4083 8.9866C19.578 8.8452 19.8843 8.62002 19.6393 8.36341C19.445 8.16092 18.92 8.45244 18.92 8.45244L15.9151 9.62374C15.019 9.93271 14.424 10.3901 14.3715 10.9661C14.3032 11.7342 14.9945 12.3259 15.9746 11.6591Z"
                      fill="#F4B400"
                    />
                  </svg>

                  <Typography
                    variant="body1"
                    className="item-text"
                    color={"#34E0A1"}
                  >
                    {item.item}
                  </Typography>
                </div>
              ))}
            </div>
          )}
          {/* usp items ends */}

          <div className="body1 description mt-32" dangerouslySetInnerHTML={{ __html: description }}></div>
            {link && (
                <Link href={link.url} className="mt-16 inline-block" target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" color="primary">
                    {link.title}
                  </Button>
                </Link>
              )}
            </div>
          </Container>
          <div className="image-container">
            <div className="image-wrapper" style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}>
                <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                quality={100}
                />
            </div>
          </div>
        </Section>
      );
}
const Section = styled.section`
  padding: 64px 0;
position: relative; 
   @media(max-width: 1200px){ 
        overflow: hidden;
    }
.content-wrapper{ 
    position: relative; 
    z-index: 20; 
    max-width: 900px;
   @media (max-width: 600px) { 
        text-align: center;
    }
    .usp-items{ 
        @media (max-width: 600px){ 
            justify-content: center;
        }
    }
}
  .image-container{ 
    position: absolute; 
    right: 0; 
    top: 0; 
        width: 50%;
    z-index: 20;
    .image-wrapper{ 
      z-index: 30;
    }
    @media(max-width: 1200px){ 
        width: 80%;
         right: -40%; 
    }
      @media(max-width: 600px){ 
        width: 150%;
         right: -70%; 
    }
  }
`;
