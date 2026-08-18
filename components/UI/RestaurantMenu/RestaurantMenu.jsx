"use client";
import React, { startTransition, useDeferredValue, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const normalizedQuery = deferredSearchQuery.trim().toLowerCase();

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

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    startTransition(() => {
      setSearchQuery(nextValue);
    });
  };

  const selectedCategory = categoryOptions[value] || categoryOptions[0];
  const categoryFilteredMenu =
    selectedCategory.value === "all"
      ? menuData
      : menuData.filter(
          (item) => item.menu_category.value === selectedCategory.value
        );

  const filteredMenuData = categoryFilteredMenu
    .map((menuSection) => {
      const menuItems = Array.isArray(menuSection.menu_item)
        ? menuSection.menu_item.filter((item) => {
            if (!normalizedQuery) return true;

            const searchableText = [
              item.dish_name,
              item.dish_description?.replace(/<[^>]+>/g, " "),
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(normalizedQuery);
          })
        : [];

      return {
        ...menuSection,
        menu_item: menuItems,
      };
    })
    .filter((menuSection) => menuSection.menu_item.length > 0);

  const visibleDishCount = filteredMenuData.reduce(
    (count, menuSection) => count + menuSection.menu_item.length,
    0
  );

  return (
    <Section id="menu-items" >
      <Paper className="tabs-container" >
        <Container maxWidth="xl" >
          <div className="menu-controls">
            <div className="search-wrapper">
              <label htmlFor="menu-search" className="sr-only">
                Search the menu
              </label>
              <input
                id="menu-search"
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search dishes, ingredients, or styles"
                className="menu-search"
              />
              <Typography variant="body2" className="results-copy">
                {visibleDishCount} dish{visibleDishCount === 1 ? "" : "es"} shown
              </Typography>
            </div>
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
          {filteredMenuData.length === 0 ? (
            <div className="empty-state">
              <Typography variant="h4">No dishes match that search.</Typography>
              <Typography variant="body1">
                Try a different keyword or switch back to another menu category.
              </Typography>
            </div>
          ) : (
            filteredMenuData.map((menuSection, index) => (
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
            ))
          )}
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
      display: grid;
      gap: 16px;
    }
    .search-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      @media (max-width: 900px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
    .menu-search {
      width: min(100%, 420px);
      min-height: 48px;
      padding: 0 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      color: var(--dark-on-surface);
      font: inherit;
      @media (max-width: 900px) {
        width: 100%;
      }
    }
    .menu-search::placeholder {
      color: rgba(255, 255, 255, 0.62);
    }
    .results-copy {
      color: rgba(255, 255, 255, 0.72);
      white-space: nowrap;
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
      .empty-state {
        padding: 48px 0 72px;
        display: grid;
        gap: 12px;
      }
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
