"use client";
import React, { startTransition, useState } from "react";
import styled from "@emotion/styled";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";
import MenuItem from "./MenuItem/MenuItem";
import Paper from "@mui/material/Paper";
export default function RestaurantMenu({ menuData, orderOnlineLink }) {
  const [value, setValue] = useState(0);
  if (!menuData) return null;

  // Extract unique menu categories for the tabs
  const categoryOptions = [
    { value: "all", label: "All" },
    ...Array.from(
    new Set(menuData.map((item) => item.menu_category.value))
    ).map((categoryValue) => {
      const category = menuData.find(
        (item) => item.menu_category.value === categoryValue
      )?.menu_category;
      return category;
    }),
  ];

  const handleChange = (event, newValue) => {
    startTransition(() => {
      setValue(newValue);
    });
  };

  const selectedCategory = categoryOptions[value] || categoryOptions[0];
  const filteredMenuData =
    selectedCategory.value === "all"
      ? menuData
      : menuData.filter(
          (item) => item.menu_category.value === selectedCategory.value
        );

  return (
    <Section id="menu-items" >
      <Paper className="tabs-container" >
        <Container maxWidth="xl" >
          <div className="menu-controls">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs"
              textColor="secondary"
              indicatorColor="secondary"
              className="tabs-wrapper"
            >
              {categoryOptions.map((category, index) => (
                <Tab key={category.value || index} label={category.label} role="navigation" href="#menu-items" />
              ))}
            </Tabs>
          </div>
        </Container>
      </Paper>
      <Container maxWidth="xl" className="container " >
        <div className="menu-section mt-40">
          {filteredMenuData.map((menuSection, index) => (
            <div key={index} className="menu-category-wrapper">
              <div className="menu-wrapper">
                <div className="menu-category-header">
                  <Typography variant="h3" className="menu-category-title">
                    {menuSection.menu_category.label}
                  </Typography>
                  <Typography variant="body2" className="menu-category-count">
                    {menuSection.menu_item.length} item
                    {menuSection.menu_item.length === 1 ? "" : "s"}
                  </Typography>
                </div>

                <ul className="menu-items mt-24" >
                  {menuSection.menu_item && menuSection.menu_item.map((item, itemIndex) => {
                    return (
                      <MenuItem
                        key={itemIndex}
                        dishName={item.dish_name}
                        dishDescription={item.dish_description}
                        dishPrice={item.dish_price}
                        dietaryInformation={item.dietry_information}
                      />
                    );
                  })}
                </ul>
              </div>

              {menuSection.menu_image && (
                <div
                  className="image-wrapper"
                  style={{
                    paddingBottom: `${
                      (menuSection.menu_image.height /
                        menuSection.menu_image.width) *
                      100
                    }%`,
                  }}
                >
                  <Image
                    src={menuSection.menu_image.sizes.medium_large}
                    alt={menuSection.menu_image.alt}
                    fill
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container-lowest);
  padding: 0 0 16px 0;
  .tabs-container {
    background: var(--dark-surface-container-highest);
    position: sticky;
    top: 72px;
    z-index: 1000;
    @media ( max-width: 1000px) {
      top: 64px; 
    } 
    .menu-controls {
      padding: 16px 0 12px;
    }
    .tabs-wrapper {
      svg {
        path {
          fill: var(--dark-on-surface);
        }
      }
      button {
        border-bottom: 1px solid var(--dark-on-surface);
      }
    }
  }

  .container {
    .menu-section {
      margin-top: 80px; 
      .menu-category-wrapper {
        margin-bottom: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        gap: 56px;
        @media (max-width: 1000px) {
          grid-template-columns: 1fr;
        }
        .menu-wrapper {
          .menu-category-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 16px;
            @media (max-width: 640px) {
              flex-direction: column;
              align-items: flex-start;
            }
          }
          .menu-category-count {
            color: rgba(255, 255, 255, 0.65);
          }
          .menu-items {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
        }
        .image-wrapper {
          @media (min-width: 1000px) {
            position: sticky;
            top: 100px;
          }
        }
      }
    }
  }
`;
