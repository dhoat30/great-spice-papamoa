import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import styled from "@emotion/styled";

export default function TextLink({ label, url, color, className, size }) {
  
  return (
    <div

    >
      <Container
        href={url}
        className={className}
 
      >
        <Typography
          component={div}
          className="label"
          color={color ? color : "white"}
        >
          {label}
          <span
            className="underline"
            style={{ backgroundColor: color ? color : "white" }}
            // Initial width is 0 to hide the underline
          ></span>
        </Typography>
        {!isHovered ? (
          <svg
            width={size === "sm" ? "20" : "20"}
            viewBox="0 0 93 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59 4L88 33L59 62"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
              style={{ transform: "translateX(-60px)" }}
            />
            <path
              d="M4 33H87"
              stroke={color ? color : "white"}
              strokeWidth="0"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width={size === "sm" ? "20" : "25"}
            viewBox="0 0 93 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59 4L88 33L59 62"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
              variants={arrowVariants}
              initial="hidden"
              animate="visible"
            />

            <path
              initial="hidden"
              animate="visible"
              variants={pathVariants}
              d="M4 33H87"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        )}
      </Container>
    </div>
  );
}

const Container = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  div {
    font-weight: 400;
    display: inline-block;
    position: relative;
  }

  .underline {
    position: absolute; /* Position the pseudo-element relative to the parent span */
    bottom: -8px;
    left: 0;
    width: 0%; /* Initial width is 0% to hide the underline */
    height: 2px; /* Set the desired height for the underline */
  }
  @media (max-width: 600px) {
    .label {
      font-size: 1rem;
    }
    svg {
      width: 20px;
    }
  }
`;
