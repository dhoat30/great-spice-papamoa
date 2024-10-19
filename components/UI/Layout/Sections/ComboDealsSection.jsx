import styled from "@emotion/styled";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScrollableTabs from "../../Tabs/ScrollableTabs";
import PatternHeading from "../../Headings/PatternHeading";

export default function ComboDealsSection({ title, description, cards }) {
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        <PatternHeading title={title} description={description} centerAlign />
        <div className="tabs mt-24">
          <ScrollableTabs tabsData={cards} />
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-secondary-container);
  padding: 80px 0;
  @media (max-width: 900px) {
    padding: 40px 0;
  }

  .title-row {
    max-width: 1000px;
    margin: 0 auto;
    .title {
    }
    .subtitle {
    }
    .description {
      margin-top: 16px;
    }
  }
  .cards {
    margin-top: 80px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    @media (max-width: 900px) {
      display: flex;
      gap: 32px;
      flex-direction: column;
    }
  }
`;
