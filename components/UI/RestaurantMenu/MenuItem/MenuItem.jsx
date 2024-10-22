import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import GlutenFreeIcon from "../../Icons/GlutenFreeIcon";
import VeganIcon from "../../Icons/VeganIcon";
import VegetarianIcon from "../../Icons/VegetarianIcon";
import DairyFreeIcon from "../../Icons/DariyFreeIcon";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function MenuItem({
  dishName,
  dishDescription,
  dishPrice,
  condition,
  dietaryInformation,
}) {
  const [glutenFree, setGlutenFree] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  useEffect(() => {
    dietaryInformation.map((item, index) => {
      console.log(item);
      if (item.value === "vegetarian") {
        setVegetarian(true);
      } else if (item.value === "vegan") {
        setVegan(true);
      } else if (item.value === "glutenFree") {
        setGlutenFree(true);
      } else if (item.value === "dairyFree") {
        setDairyFree(true);
      }
    });
  }, []);
  // console.log(dietaryInformation);

  // console.log(glutenFree, vegetarian, vegan, dairyFree);
  return (
    <Container className="menu-item ">
      <div className="dish-wrapper">
        <div className="dish-name-wrapper">
          <Typography className="dish-name" variant="h6" component="h3">
            {dishName}
            <span className="icon-wrapper">
              {glutenFree && (
                <Tooltip title="Gluten Free" arrow>
                  <Button>
                    <GlutenFreeIcon className="inline-block" />
                  </Button>
                </Tooltip>
              )}
              {vegan && (
                <Tooltip title="Vegan" arrow>
                  <Button>
                    <VeganIcon className="inline-block" />
                  </Button>
                </Tooltip>
              )}
              {vegetarian && (
                <Tooltip title="Vegetarian" arrow>
                  <Button>
                    <VegetarianIcon className="inline-block" />
                  </Button>
                </Tooltip>
              )}
              {dairyFree && (
                <Tooltip title="Dairy Free" arrow>
                  <Button>
                    <DairyFreeIcon className="inline-block" />
                  </Button>
                </Tooltip>
              )}
            </span>
          </Typography>
          {condition && (
            <Typography variant="body2" component="div">
              *{condition}
            </Typography>
          )}
        </div>
        <Typography variant="subtitle1" component="div" className="dish-price">
          ${dishPrice}
        </Typography>
      </div>
      <Typography variant="body1" component="p" className="description mt-8">
        {dishDescription}
      </Typography>
      <div className="dish-border mt-16"></div>
    </Container>
  );
}

export default MenuItem;
const Container = styled.li`
  .dish-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
    .dish-name {
      display: flex;
      align-items: center;
      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
      }
      /* tool tip  */
      button {
        display: inline-block;
        padding: 0 8px !important;
        height: 16px !important;
        font-size: 0;
        line-height: 0;
        min-width: 16px;
        svg {
          margin-left: 4px;
          width: 16px;
          height: 16px;
          path {
            fill: var(--dark-on-surface);
          }
        }
      }
    }
  }
  .description {
    width: 80%;
  }
  .dish-border {
    border-bottom: 1px solid var(--dark-outline);
    opacity: 0.6;
  }
`;
