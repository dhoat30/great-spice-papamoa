"use client";
import { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import PatternHeading from "../Headings/PatternHeading";
import TestimonialCard from "../Card/TestimonialCard";
import Slider from "react-slick";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
var settings = {
  dots: false,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  centerMode: true,
  centerPadding: "40px",
  draggable: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Testimonials({ testimonialsData, showGrid=false, data }) {
  // slider arrow functionality
  const sliderRef = useRef(null);

  console.log(data);
  if (!testimonialsData) return null;

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
  const testimonialCardsJSX = data.map(
    (item, index) => {
      if (index > 8) return null;
      return (
        <TestimonialCard
        className="card"
          key={index}
          name={item.reviewer.displayName}
          description={item.comment}
    
          customerPic={item.reviewer.profilePhotoUrl}
        />
      );
    }
  );
  return (
    <Section>
      {showGrid ? 
      <Container maxWidth="xl" className="mt-40">
        <PatternHeading
        title={testimonialsData.title}
        description={testimonialsData.subtitle}
      />
      <div className="grid-wrapper mt-32" >
      {testimonialCardsJSX}
      </div>
      </Container>
      : 
      <>
      <Container maxWidth="xl">
      <PatternHeading
        title={testimonialsData.title}
        description={testimonialsData.subtitle}
      />
      <div className="arrows-wrapper mt-24">
        <CarouselArrows next={next} previous={previous} />
      </div>
    </Container>
    <div className="carousel-wrapper mt-16">
      <Slider ref={sliderRef} {...settings}>
        {testimonialCardsJSX}
      </Slider>
    </div>
    </>
      }
      
      <Container maxWidth="xl" className="cta-wrapper mt-32">
        <Link href={testimonialsData.write_a_review_url.url} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
            {testimonialsData.write_a_review_url.title}
          </Button>
        </Link>
        {!showGrid && 
          <Link href={testimonialsData.view_all_url.url}>
          <Button variant={`outlined`}>
            {testimonialsData.view_all_url.title}
          </Button>
        </Link>
        }
      
      </Container>
    </Section>
  );
}
const Section = styled.section`
  border-top: 1px solid var(--dark-outline-variant);
  border-bottom: 1px solid var(--dark-outline-variant);

  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }

  .grid-wrapper{ 
  display:grid; 
   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 16px; 
    @media(max-width: 450px){ 
       grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    }
    .card{ 
    max-width: 100%; 
    }
  }
  .arrows-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .cta-wrapper {
    display:flex; 
    gap: 16px; 
    flex-wrap: wrap; 
    align-items: center;
    justify-content: center;  
  }

  
`;
