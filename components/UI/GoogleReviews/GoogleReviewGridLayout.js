"use client";

import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";

export default function GoogleReviewGridLayout({ data }) {
  console.log(data);
  if (!data && data.reviews.length === 0) return null;

  const filteredReviewData = data.reviews.filter((item) => {
    return item.stars === 5 && typeof item.text === "string";
  });

  console.log(filteredReviewData);
  const testimonialCardsJSX = filteredReviewData.map((item, index) => {
    if (index > 100) return null;
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

  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper mt-16">{testimonialCardsJSX}</div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container-lowest);

  padding: 4px 0 16px 0;

  .grid-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    justify-content: center;
    @media (max-width: 400px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    /* override the googleReviewcard div's max width */
    > div {
      max-width: 100%;
    }
  }
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
`;
