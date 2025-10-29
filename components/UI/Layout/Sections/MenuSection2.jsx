'use client'
import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Image from "next/image";
import { Typography } from "@mui/material";
import PatternHeading from "../../Headings/PatternHeading";
import MenuCard2 from "../../Card/MenuCard2";
import { useRef, useCallback } from "react";
import CarouselArrows from "../../CarouselArrows/CarouselArrows";
import Slider from "react-slick";
import Link from "next/link";
import Button from "@mui/material/Button";
var settings = {
    dots: false,
    arrows: false,
    speed: 500,
  slidesToShow: 3,
    slidesToScroll: 3, 
    infinite: true,
// 👈 show part of next slide
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                  slidesToScroll: 2, 
                      centerMode: true,
  centerPadding: "56px", 


            },
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 1,
                                  slidesToScroll: 1, 
       centerMode: true,
  centerPadding: "24px", 
            },
        },
    ],
};

export default function MenuSection2({
  title,
  description,
  cards,
  className,
  backgroundImage,
  termsAndConditions, 
  link, 
  extraInfoGroup
}) {
      const sliderRef = useRef(null);

  if (cards.length === 0) {
    return;
  }
 const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
  const cardsComponent = cards.map((card, index) => {
    return (
      <MenuCard2
        key={index}
        title={card.item_title}
        description={card.item_description}
        image={card.image}
        cta={card.link}
      />
     
    );
  });
  return (
    <Section className={className}>
      <div
        className={"background-image-wrapper image-wrapper"}

      >
        {backgroundImage && (
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt || "Background Image"}
            layout="fill"
            objectFit="cover"
            fill
            sizes="100vw"
          />
        )}
        <Container className="container" maxWidth="lg">
          <div className="title-description-wrapper ">
            <Typography variant="h2" component="h2" color={"#1D1D1D"} align="center">
              {title}
            </Typography>

            {description && (
              <Typography
                variant="h4"
                component="p"
                className="description mt-16"
                color={"#1D1D1D"}
              >
                {description}
              </Typography>
            )}
            {termsAndConditions && (
              <Typography
                variant="body2"
                component="p"
                className="description mt-16"
                color={"#1D1D1D"}
                align="center"
              >
                {termsAndConditions}
              </Typography>
            )}
          </div>
          <div className="cards-wrapper mt-64">
                            <Slider ref={sliderRef} {...settings}>
            
            {cardsComponent}
               </Slider>
            </div>

            <div className="extra-info-wrapper">
              <Typography variant="h5" component="h3" 
              color={"#1D1D1D"}
              >
                {extraInfoGroup?.title}
              </Typography>
                <Typography variant="body1" component="p"  className="mt-48"             color={"#1D1D1D"}
>
                {extraInfoGroup?.description}
              </Typography>
                <Link href={link?.url} className="mt-48" style={{ display: 'inline-block' }}>
                  <Button variant="contained" color="primary">
                    {link?.title}
                  </Button>
                </Link>
              </div> 
        </Container>
      </div>
    </Section>
  );
}
const Section = styled.section`

  .background-image-wrapper{ 
height: 100%;
  padding: 80px 0 40px 0;

  @media (max-width: 768px) {
    padding: 40px 0 0 0;
    margin-bottom: -40px;
  }
  }
  .container {
    position: relative;
    z-index: 2;
    .title-description-wrapper {
          text-align: center;

      
    }
    .cards-wrapper {
      .slick-track {
  display: flex !important;
  align-items: stretch;
}
.slick-slide > div {
  height: 100%;
 

}
.slick-slide > div {
  margin: 0 12px;
  
  @media (max-width: 600px) {
    margin: 0 8px;
  }
}

.slick-list {
  margin: 0 -12px; /* compensate for outer margins */
    @media (max-width: 600px) {
    margin: 0 -8px;
  }
}

    }
  }
  .extra-info-wrapper{ 
    text-align: center; 
    position: relative; 

    max-width: 900px; 
    margin: -80px auto 24px auto;
  }
`;
