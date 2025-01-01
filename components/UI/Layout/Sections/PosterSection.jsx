"use client";

import { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Slider from "react-slick";
import CarouselArrows from "../../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, theme } from "@/utils/themeSettings";
import Image from "next/image";
var settings = {
  dots: true,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,

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

export default function PosterSection({ title, cards, themeStyle }) {
  const themeType = themeStyle.value === "light" ? lightTheme : theme;
  const backroundColor =
    themeStyle.value === "light"
      ? "var(--light-surface-container-lowest)"
      : "var(--dark-surface-container-lowest)";

      const iconColor =
    themeStyle.value === "light"
      ? "var(--light-primary)"
      : "var(--dark-primary)";
  // slider arrow functionality
  const sliderRef = useRef(null);

  if (!cards) return null;

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

  const cardsJSX = cards.map((item, index) => {
    console.log(item);
    const padding = (item.image.height / item.image.width) * 100;
    return (
      <Link
        href="/"
        key={index}
        className="card"
        style={{ gridColumn: `span ${item.how_many_columns_to_use.value}` }}
      >
        <div className="image-wrapper" style={{ paddingBottom: `${padding}%` }}>
          <Image src={item.image.url} alt={item.image.alt} fill />
        </div>
        <Typography variant="body1" component="p" className="terms-conditions mt-8">
            {item.terms_conditions}
            </Typography>
      </Link>
    );
  });

  return (
    <ThemeProvider theme={themeType}>
      <Section backgroundcolor={backroundColor}>
        <Container maxWidth="xl">
          <div className="title-row">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
          </div>
          <div className="poster-grid-wrapper mt-24">{cardsJSX}</div>

          <div className="carousel-wrapper mt-8">
            <div className="arrows-wrapper">
              <CarouselArrows
                next={next}
                previous={previous}
                color={iconColor}
              />
            </div>
            <Slider ref={sliderRef} {...settings}>
              {cardsJSX}
            </Slider>
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

const Section = styled.section`
  /* add props  */
  background: ${(props) => props.backgroundcolor && props.backgroundcolor};
  padding: 40px 0;

  .title-row {
    .title {
      font-weight: 900 !important;
    }
  }
  .poster-grid-wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    @media (max-width: 600px) {
      display: none;
    }
  }
 
  .carousel-wrapper {
        display: none;

    @media (max-width: 600px) {
      display: block;
    }
    .arrows-wrapper {
    display: flex;
    justify-content: flex-end;

  }
  }
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
`;
