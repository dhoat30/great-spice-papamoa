import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
export default function BulkCurryOptions({
  title,
  cards,
  link,
  termsAndConditions,
  description,
}) {
  var settings = {
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
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => (
    <div
      key={index}
      className=" card p-24"
      style={{
        border: "1px solid #FFFFFF",
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="image-container">
        {card.image && (
          <div
            className="image-wrapper"
            style={{
              paddingBottom: `${(card.image.height / card.image.width) * 100}%`,
            }}
          >
            <Image
              src={card.image.url}
              alt={card.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      <Typography
        className="mt-40 mb-24 title"
        variant="h5"
        component="h3"
        color={"#FFFFFF"}
      >
        {card.title}
      </Typography>
      <ul className="items ">
        {card.items && (
            card.items?.map((item, index) => (
          
              <li key={index} className="item grid justify-between mt-16 gap-24">
                <Typography variant="body2" component="span" color="white">
                  {item.item}
                    </Typography>
                      <Typography variant="body2" component="span" color="white">
                     {item.price}
                    </Typography>
                
              </li>
            
            ))
        )}
      </ul>
    </div>
  ));

  return (
    <Section>
      <Container maxWidth="lg" className="container">
        <div className="title-wrapper mb-56">
          <Typography variant="h2" component="h3" className="description">
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description mt-16"
          >
            {description}
          </Typography>
        </div>
        <div className="carousel-wrapper mt-40">
          <Slider {...settings}>{cardsJSX}</Slider>
        </div>
        <div className="terms-wrapper mt-32">
          <Typography variant="body1" component="h4" color={"#FFFFFF"} align="center">
            {termsAndConditions}
          </Typography>
        </div>
        <div className="button-wrapper flex justify-center mt-16">
        <Link href={link.url} target={link.target} >
    <Button variant="contained" color="primary" >
          {link.title}
          </Button>
         
        </Link>
        </div> 
      </Container>
    </Section>
  );
}
const Section = styled.section`
  position: relative;
  padding: 80px 0 80px 0;
  @media (max-width: 768px) {
    padding: 40px 0 40px 0;
  }

  .container {
    .title-wrapper {
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
    }
    .carousel-wrapper {
      padding: 0 40px;

      /* card fills full available height */
      .card {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        padding: 16px;

        height: 100%;
        box-sizing: border-box;
        @media (max-width: 700px) {
          padding: 24px;
        }
        .title {
          font-size: 1.3rem;
        }
        .items { 
            text-align: left;
            .item{ 
                grid-template-columns: 1fr auto;
            }
        }
      }
      .slick-slider {
        overflow: visible;
      }

      .slick-list {
        margin: 0 -16px;
      }

      /* make slick-track behave like a flex row of equal-height items */
      .slick-track {
        display: flex !important;
        align-items: stretch;
      }

      /* every slide container fills its flex slot */
      .slick-slide {
        height: auto !important;
      }

      .slick-slide > div {
        display: flex;
        height: 100%;
        padding: 0 16px;
      }
    }
    .extra-info-wrapper {
      margin-left: 40px;
      margin-right: 40px;

      text-align: center;
      background: var(--dark-surface-container-lowest);
      border-radius: 8px;
      padding: 32px;
      @media (max-width: 700px) {
        margin-left: 0;
        margin-right: 0;
      }
    }
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
