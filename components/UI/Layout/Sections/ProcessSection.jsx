import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Slider from "react-slick";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

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
      settings: { slidesToShow: 2,},
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1,  },
    },
  ],
};

export default function ProcessSection({ title, description, cards, backgroundImage, extraInfoGroup }) {

  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => (
      <div  key={index} className=" card p-24" style={{ border: "1px solid #FFFFFF", borderRadius: "8px", background: "rgba(255, 255, 255, 0.1)" }}>
        <div className="image-container" style={{maxWidth: "100px", margin: "0 auto" }}>
        {card.image && 
          <div className="image-wrapper" style={{ paddingBottom: `${card.image.height / card.image.width * 100}%` }}>
            <Image src={card.image.url} alt={card.title} fill style={{ objectFit: "contain" }} />
          </div>
        }
        </div>

        <Typography className="mt-40" variant="subtitle1" component="h3" color={"#FFFFFF"}>{card.title}</Typography>
        <div dangerouslySetInnerHTML={{ __html: card.description }} className="mt-8 body1" style={{ color: "#FFFFFF", fontSize: "16px", lineHeight: "24px" }}></div>
      </div>
    
  ));

  return (
    <>
    <Section> 

      <div className="image-wrapper background-image-wrapper" style={{ paddingBottom: `${backgroundImage.height / backgroundImage.width * 100}%` }}>
          <Image src={backgroundImage.url} alt={title} fill />
        </div>
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
          <div className="carousel-wrapper mt-32">
                <Slider {...settings}>
                    {cardsJSX}
                </Slider>
            </div>
          <div className="extra-info-wrapper mt-32">
            {extraInfoGroup && 
              <div className="">
                <Typography variant="h6" component="h4" color={"#FFFFFF"}>{extraInfoGroup.title}</Typography>
                <Typography className="mt-16" variant="body1" component="p" color={"#FFFFFF"}>{extraInfoGroup.description}</Typography>
              </div>
            }
          </div>
          </Container>
    </Section>
    </>
  );
}
const Section = styled.section`
position: relative; 

.background-image-wrapper{ 
  @media (max-width: 1230px) { 
    padding-bottom: 80% !important; 
  }
   @media (max-width: 950px) { 
    padding-bottom:100% !important; 
  }
    @media (max-width: 850px) { 
    padding-bottom:140% !important; 
  }
      @media (max-width: 650px) { 
    padding-bottom:170% !important; 
  }
    @media (max-width: 550px) { 
    padding-bottom:220% !important; 
  }
      @media (max-width: 460px) { 
    padding-bottom:260% !important; 
  }
    @media (max-width: 420px) { 
    padding-bottom:300% !important; 
  }
    @media (max-width: 360px) { 
    padding-bottom:350% !important; 
  }
}


.container{ 
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title-wrapper {
    text-align: center; 
    max-width: 900px;
    margin: 0 auto;
  }
.carousel-wrapper {
  padding: 0 40px; 

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
    padding: 40px;
    
    height: 100%;
    box-sizing: border-box;
    @media(max-width: 700px){ 
      padding: 24px;
    }
  }
}
  .extra-info-wrapper{ 
      margin-left:  40px; 
      margin-right: 40px;

    text-align: center; 
    background: var(--dark-surface-container-lowest);
    border-radius: 8px;
    padding: 32px; 
    @media(max-width: 700px){
      margin-left: 0 ; 
      margin-right: 0 ;
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