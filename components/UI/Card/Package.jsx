import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";

export default function Package({
  packageName,
  packagePrice,
  packageDescription,
  packageItems,
  termsAndConditions,
  addOn,
  image,
  cta,
  isItPopular,
  highlightLabel,
}) {
  const price = packagePrice ? (
    <Typography component="p" variant="h5" className="price" color="white">
      ${packagePrice}
    </Typography>
  ) : null;

  return (
    <Div
      className={`package ${isItPopular ? "highlighted-package" : ""} ${
        image ? "has-image" : ""
      }`}
    >
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
        <div className="image-wrapper">
          <Image
            src={image.url}
            alt={packageName}
            fill
            sizes="(max-width: 650px) 100vw, 440px"
          />
          {price && <div className="price-badge">{price}</div>}
        </div>
      )}
      <div className={"content-container"}>
        <div className="content-wrapper">
          <div className="header-row">
            <Typography
              variant="h5"
              component="h3"
              className="package-title"
              color="white"
              align="center"
            >
              {packageName}
            </Typography>
            {!image && price && (
              <div className="price-inline">{price}</div>
            )}
          </div>

          {termsAndConditions && (
            <Typography
              color="var(--dark-on-surface-variant)"
              component="p"
              variant="body2"
              className="terms-and-conditions"
            >
              *{termsAndConditions}
            </Typography>
          )}

          {packageItems?.length > 0 && (
            <ul className="included-services-wrapper">
              {packageItems.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2" component="span" color="white">
                    {item.item}
                  </Typography>
                </li>
              ))}
            </ul>
          )}

          {addOn && (
            <Typography
              color="var(--dark-primary)"
              component="p"
              variant="body2"
              className="add-on-info"
            >
              {addOn}
            </Typography>
          )}
        </div>
        {cta && (
          <Link href={cta.url} target={cta.target} className="cta-wrapper">
            <Button variant="contained" disableElevation>
              {cta.title}
            </Button>
          </Link>
        )}
      </div>
    </Div>
  );
}
const Div = styled.div`
  position: relative;
  width: 100%;
  align-self: stretch;
  border: 1px solid
    var(--material-theme-sys-dark-surface-container-highest, #03327a);
  border-radius: 12px;
  background: var(--dark-surface-container);
  display: flex;
  flex-direction: column;

  .image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 12 / 5;
    overflow: hidden;
    border-radius: 11px 11px 0 0;
  }

  .image-wrapper img {
    object-fit: cover;
  }

  /* price sits on the image so it never costs a row of its own */
  .price-badge {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 4px 14px;
    border-radius: 999px;
    background: rgba(3, 20, 48, 0.82);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.22);
  }

  .price {
    line-height: 1.1;
    font-size: 1.5rem;
    white-space: nowrap;
  }

  .content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px 18px 18px;
    text-align: center;

    .content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .header-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .package-title {
      text-wrap: balance;
      line-height: 1.2;
      font-size: clamp(1.35rem, 1.05rem + 0.7vw, 1.65rem);
    }

    .price-inline {
      padding: 2px 16px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.08);
    }

    .terms-and-conditions,
    .add-on-info {
      display: block;
      max-width: 34ch;
      line-height: 1.35;
      font-size: 0.85rem;
    }

    .add-on-info {
      font-weight: 600;
    }

    /* included items as wrapping chips instead of one row each */
    .included-services-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .included-services-wrapper li {
      margin: 0;
      padding: 4px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.06);
    }

    .included-services-wrapper span {
      font-size: 0.92rem;
      line-height: 1.3;
    }

    .cta-wrapper {
      margin-top: 16px;
      width: 100%;
      display: block;
      button {
        width: 100%;
        border-radius: 999px;
      }
    }
  }

  @media (max-width: 900px) {
    .content-container {
      padding: 14px 14px 14px;
    }
  }

  &.highlighted-package {
    border: 1px solid #46acdb;
    background: linear-gradient(
      180deg,
      rgba(70, 172, 219, 0.3) 0%,
      rgba(134, 65, 213, 0.3) 100%
    );

    .highlighted-tag {
      position: absolute;
      top: -17px;
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
