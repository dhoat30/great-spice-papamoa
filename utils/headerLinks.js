export const headerLinks = [
  {
    id: 2,
    label: "Home",
    url: "/",
  },

  {
    id: 2,
    label: "RESERVATION",
    url: "/reservation",
    target: "_blank",
  },
  {
    id: 2,
    label: "ORDER ONLINE",
    url: "https://www.ordermeal.co.nz/great-spice-papamoa-east",
    target: "_blank",
  },
  {
    id: 6,
    label: "MENU",
    url: "/menu",
    subLinks: [
      { label: "Combo Lunch Menu", url: "/menu/lunch-menu" },
      { label: "Takeaway Menu", url: "/menu/takeaway-menu" },
      { label: "Dine-In Menu", url: "/menu/dine-in-menu" },
    ],
  },
  {
    id: 2,
    label: "DEALS",
    url: "#",
    subLinks: [
        {
            label: "Combo Deals",
            url: "/combo-deals",
          },
      {
        label: "Takeaway & Dine-in Specials",
        url: "/deals/papamoa-dining-takeaway-specials",
      },
      { label: "Happy Hour Deals", url: "/deals/papamoa-happy-hour-deals" },
    ],
  },
 

  {
    id: 6,
    label: "SERVICES",
    url: "/catering",
    subLinks: [
      { label: "Catering", url: "/catering" },
      { label: "Venue Hire", url: "/venue-hire" },
    ],
  },

  {
    id: 6,
    label: "GALLERY",
    url: "/gallery",
    subLinks: [
      { label: "Gallery", url: "/gallery/image-gallery" },
      { label: "Video Gallery", url: "/gallery/video-gallery" },
    ],
  },

  {
    id: 6,
    label: "CONTACT",
    url: "/contact",
  },
];
