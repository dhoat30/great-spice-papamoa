'use client';

import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
const timeAgo = (dateString) =>  { 
  const now = new Date();
  const createdDate = new Date(dateString);
  const secondsAgo = Math.floor((now - createdDate) / 1000);

  const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
}
  return "just now";

}

export default function GoogleReviewGridLayout({data}) {
  // filter review comment 
  const filteredReviewData = data.filter((item) => { 
    return (    item.starRating === "FIVE" &&
      typeof item.comment === "string"
      )
  });
  const testimonialCardsJSX = filteredReviewData.map(
    
    (item, index) => {
  
      return (
        <GoogleReviewCard
          key={index}
          name={item.reviewer.displayName}
          description={item.comment}
          customerPic={item.reviewer.profilePhotoUrl}
          timeAgo={timeAgo(item.createTime)}
        />
      );
    }
  );

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

  padding: 4px  0 16px 0;
 
.grid-wrapper{ 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px; 
  justify-content: center; 
  @media(max-width: 400px){ 
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  }
  /* override the googleReviewcard div's max width */
  >div{ 
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
