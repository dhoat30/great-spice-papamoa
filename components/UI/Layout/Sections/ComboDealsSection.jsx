import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import PatternHeading from "../../Headings/PatternHeading";
import Package from "../../Card/Package";

export default function ComboDealsSection({ title, description, cards }) {
  if (!cards) return null;

  return (
    <Section className="mt-8">
      <Container maxWidth="xl" className="container">
        <PatternHeading
          title={title}
          description={description}
          centerAlign={true}
          hidePattern={true}
        />
        <div className={`cards grid-wrapper count-${cards.length}`}>
          {cards.map((item, index) => (
            <Package
              key={index}
              packageName={item.combo_name}
              packagePrice={item.price}
              packageItems={item.included}
              termsAndConditions={item.terms_and_conditions}
              addOn={item.add_on}
              cta={item.cta}
              image={item.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;

  overflow: hidden;
  background-color: var(--dark-surface-container-lowest);
  .pattern {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    right: -50%;
    @media (max-width: 600px) {
      display: none;
    }
    /* add rotation animation */
    animation: rotate 100s linear infinite;
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .container {
    padding-top: 80px;
    padding-bottom: 80px;
    @media (max-width: 900px) {
      padding-top: 40px;
      padding-bottom: 40px;
    }
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
    margin-top: 48px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    align-items: stretch;
    > * {
      width: min(100%, 440px);
      flex: 0 1 440px;
      display: flex;
    }
    @media (max-width: 1000px) {
      gap: 16px;
    }
    @media (max-width: 650px) {
      gap: 32px;
      > * {
        width: 100%;
        flex-basis: 100%;
      }
    }
  }
`;
