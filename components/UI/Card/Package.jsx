import Container from "@mui/material/Container";
import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
export default function Package({
  packageName,
  packagePrice,
  packageDescription,
  packageItems,
  termsAndConditions,
  image, 
  cta,
  isItPopular,
  highlightLabel,
  
}) {
  return (
   
     
          <Div className={`package ${isItPopular && "highlighted-package"}`}>
      {isItPopular && (
        <Typography
          variant="subtitle1"
          component="div"
          className="highlighted-tag"
        >
          {highlightLabel ? highlightLabel : "Popular"}
        </Typography>
      )}
 {image && (
        <div className="image-wrapper" style={{ paddingBottom: `${image.height / image.width * 100}%` }}>
          <Image src={image.url} alt={packageName} fill />
        </div>
      )}
      <div className={"content-container"}>
    <div className="content-wrapper mt-24"  >
      <Typography
        variant="h5"
        component="h3"
        className="package-title "
        color="white"
        align="center"
      >
        {packageName}
      </Typography>
      {/* <Typography
        variant="h5"
        align="center"
        component="p"
        className="description mt-16"
        color="var(--dark-on-surface-variant)"
      >
        {packageDescription}
      </Typography> */}
      <div className="price-wrapper mt-16 mb-16">
        <Typography
          component="p"
          variant="h5"
          className="price"
          color="white"
          align="center"
        >
          ${packagePrice}
        </Typography>
        {termsAndConditions && (
          <Typography
            color="white"
            component="span"
            variant="body2"
            className="terms-and-conditions"
          >
            *{termsAndConditions}
          </Typography>
        )}
      </div>
      <ul className="included-services-wrapper mt-24">
        {packageItems?.map((item, index) => {
          return (
            <li key={index} className="mt-8">
              <Typography variant="subtitle1" component="span" color="white">
                {item.item}
              </Typography>
            </li>
          );
        })}
      </ul>

      </div>
            {cta && 
      <Link href={cta.url} target={cta.target} className="cta-wrapper mt-24">
 <Button variant="contained" disableElevation >
          {cta.title}
        </Button>
      </Link>
      }
      </div>
    </Div>
 

  );
}
const Div = styled.div`
  height: 100%;
  border: 1px solid var(--material-theme-sys-dark-surface-container-highest, #03327a);
  border-radius: 12px;
  background: var(--dark-surface-container);
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;

  .image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 12px 12px 0 0;
  }

  .content-container {
    flex: 1; /* take full height below image */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 16px 24px;
    text-align: center;

    .content-wrapper {
      flex-grow: 1; /* push button down */
    }

    .cta-wrapper {
      margin-top: 24px; /* add spacing between content and button */
      width: 100%;
      display: block;
      button {
        width: 100%;
      }
    }
  }

  &.highlighted-package {
    position: relative;
    border: 1px solid #46acdb;
    background: linear-gradient(
      180deg,
      rgba(70, 172, 219, 0.3) 0%,
      rgba(134, 65, 213, 0.3) 100%
    );

    .highlighted-tag {
      position: absolute;
      top: -19px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 6px;
      border: 1px solid #46acdb;
      background: linear-gradient(98deg, #46acdb 6.38%, #8641d5 93.34%);
      color: white;
      padding: 4px 16px;
z-index: 100; 
    }

    .cta-wrapper button {
      color: white;
      border: 1px solid #46acdb;
      background: linear-gradient(91deg, #46acdb 2.5%, #8641d5 49.68%);
    }
  }
`;