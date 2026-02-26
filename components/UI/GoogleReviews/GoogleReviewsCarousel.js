"use client";

import { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Slider from "react-slick";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
var settings = {
  className: "center",
  dots: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  autoplay: false,
  draggable: true,
  centerMode: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};

const timeAgo = (dateString) => {
  const now = new Date();
  const createdDate = new Date(dateString);
  const secondsAgo = Math.floor((now - createdDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};
export default function GoogleReviewsCarousel({ data }) {
  if (!data && data.reviews.length === 0) return null;

  // slider arrow functionality
  const sliderRef = useRef(null);

  if (!data) return null;

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
  // filter review comment
  const filteredReviewData = data.reviews.filter((item) => {
    return item.stars === 5 && typeof item.text === "string";
  });

  const testimonialCardsJSX = filteredReviewData.map((item, index) => {
    if (index > 10) return null;
    return (
      <GoogleReviewCard
        key={index}
        name={item.name}
        description={item.text}
        customerPic={item.reviewerPhotoUrl}
        characterLimit={80}
      />
    );
  });
  console.log(filteredReviewData);
  return (
    <Section>
      <Container maxWidth="xl">
        <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            Guests Love Us
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description mt-16"
            align="center"
          >
            At Great Spice Papamoa East, we take pride in delivering exceptional
            dining experiences. See what our guests from Papamoa, Tauranga, and
            the Bay of Plenty say about our authentic Indian cuisine and warm
            hospitality.{" "}
          </Typography>
        </div>

        <div className="carousel-wrapper mt-32">
          <Slider ref={sliderRef} {...settings}>
            {testimonialCardsJSX}
          </Slider>
        </div>
      </Container>

      <Container maxWidth="xl" className="cta-wrapper mt-32">
        <Link href={"https://g.page/r/CU4J4rdwdR0mEAE/review"} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
            Leave a Review
          </Button>
        </Link>
        <Link href="/all-testimonials">
          <Button variant={`outlined`}>Read More Reviews</Button>
        </Link>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container);

  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .title-row {
    max-width: 900px;
    margin: 0 auto;
  }
  .arrows-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .slick-slide {
    @media (min-width: 600px) {
      opacity: 1;
      transform: scale(0.9);
      transition: all 0.3s ease;
    }
  }

  .slick-center {
    @media (min-width: 600px) {
      opacity: 1;
      transform: scale(1.05); /* 👈 slightly bigger */
      z-index: 5;
    }
  }
  .carousel-wrapper {
    padding: 0 32px;
  }
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
`;

function NextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "-40px",
        transform: "translateY(-50%)",
        color: "#fff",
        background: "rgba(255,255,255,0.1)",
        "&:hover": { background: "#46acdb" },
        zIndex: 2,
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "-40px",
        transform: "translateY(-50%)",
        color: "#fff",
        background: "rgba(255,255,255,0.1)",
        "&:hover": { background: "#46acdb" },
        zIndex: 2,
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}
