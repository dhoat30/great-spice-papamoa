import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function PatternHeading({ title, description, centerAlign }) {
  return (
    <Div
      className={`${
        centerAlign ? "center-align" : "left-align"
      } title-description-wrapper`}
    >
      <div className="title-wrapper">
        <Image
          src="/title-pattern.png"
          alt="title pattern"
          width="120"
          height="51"
        />
        <Typography
          variant="h1"
          component="h2"
          className="title"
          textAlign={centerAlign ? "center" : "left"}
        >
          {title}
        </Typography>
      </div>
      <div className="description-wrapper">
        <Typography
          variant="body1"
          component="p"
          className="description"
          textAlign={centerAlign ? "center" : "left"}
        >
          {description}
        </Typography>
      </div>
    </Div>
  );
}
const Div = styled.div``;
