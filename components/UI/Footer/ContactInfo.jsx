"use client";
import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import Image from "next/image";
export default function ContactInfo({ contactInfo, className }) {
  if (!contactInfo || !contactInfo.info || contactInfo.info.length === 0)
    return null;
  const infoComponent = contactInfo.info.map((info, index) => {
    return (
      <Link href={info.url} key={index} className="info-wrapper">
        <span
          className="image-wrapper"
          style={{ width: "32px", height: "32px" }}
        >
          <Image src={info.icon.url} alt={info.icon.alt} fill />
        </span>

        {/* set div to load html  */}
        <div
            className="label body1"
            dangerouslySetInnerHTML={{ __html: info.label }}
          />
      </Link>
    );
  });
  return (
    <Container className={className}>
      <Typography variant="h6" component="div" sx={{ marginBottom: "8px" }}>
        Contact
      </Typography>
      {infoComponent}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .info-wrapper {
    display: grid;
    grid-template-columns: 32px 1fr;

    gap: 12px;
    cursor: pointer;
    .label {
      position: relative;
      top: 3px; 
      margin: 0; 
      p{ 
        margin: 0; 
        
      }
    }
    &:hover {
      svg {
        circle {
          fill: var(--dark-primary);
        }
      }
      span,
      div {
        color: var(--dark-primary);
      }
    }
  }
`;
