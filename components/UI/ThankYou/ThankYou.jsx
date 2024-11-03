"use client";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function ThankYou({
  title = "Thanks for your enquiry.",
  description = "We have received your information and we will get back you soon.",
}) {
  return (
    <Section>
      <Container maxWidth="sm" className="container">
        <div className="image-container">
          <div className="image-wrapper">
            <Image src="/congrats.png" alt="Thank you" fill />
          </div>
        </div>
        <div className="content-wrapper">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="var(--dark-on-surface)"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            align="center"
            color="var(--dark-on-surface-variant)"
          >
            {description}
          </Typography>
          <div className="button-wrapper">
            <Link href="/">
              <Button variant="outlined" color="primary" size="large">
                Go back to Home
              </Button>
            </Link>
        
          </div>
        </div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  background: var(--dark-surface-container-low);
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px; 
  padding-bottom: 40px; 
  
  .container {
    background: var(--dark-surface-container);
    border: 1px solid var(--dark-outline-variant);
    padding: 24px;
    border-radius: 12px;
    .image-container {
      max-width: 400px;
      margin: 0 auto;
      .image-wrapper {
        width: 100%;
        padding-bottom: calc(86%);
        position: relative;
      }
    }
  }
  .content-wrapper {
    margin-top: 16px;
  }
  .button-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
`;
