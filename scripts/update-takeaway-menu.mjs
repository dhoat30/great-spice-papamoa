import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const CMS_URL = "https://cms.greatspice.co.nz";
const MENU_ID = 585;

const username = process.env.WORDPRESS_USERNAME;
const password = process.env.WORDPRESS_PASSWORD;

if (!username || !password) {
  throw new Error("Missing WORDPRESS_USERNAME or WORDPRESS_PASSWORD");
}

const normalizeName = (value) =>
  (value || "")
    .replace(/&amp;/g, "&")
    .replace(/\u2019/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

const toHtml = (text) => `<p>${text}</p>\n`;

const priceUpdates = new Map([
  ["VEGETABLE SAMOSA (2 PCS)", "9"],
  ["ONION BHAJI", "9"],
  ["MIX PAKORA", "11"],
  ["TANDOORI CHICKEN - HALF", "18"],
  ["TANDOORI CHICKEN - FULL", "27"],
  ["PRAWN PAKORA", "18"],
  ["GARLIC CHICKEN TIKKA - HALF", "17"],
  ["GARLIC CHICKEN TIKKA - FULL", "24"],
  ["CHICKEN TIKKA - HALF", "17"],
  ["CHICKEN TIKKA - FULL", "24"],
  ["SEEKH KEBAB", "25"],
  ["VEGETABLE PLATTER (MIN FOR TWO PEOPLE)", "22"],
  ["MIXED PLATTER (MIN FOR TWO PEOPLE)", "25"],
  ["CHILLI CHICKEN / HONEY CHILLI CHICKEN", "22"],
  ["MANGO CHICKEN", "22"],
  ["CHICKEN MANCHURIAN", "22"],
  ["CHICKEN TIKKA MASALA", "22"],
  ["CHICKEN BALTI", "22"],
  ["LEMON HONEY CHICKEN", "22"],
  ["CHICKEN METHI MALAI", "23"],
  ["CHICKEN LABABDAR", "23"],
  ["RARA CHICKEN", "23"],
  ["BHUNA CHICKEN", "23"],
  ["HIMALAYAN HANDI CHICKEN", "25"],
  ["CHICKEN DO PIAZA", "22"],
  ["BUTTER CHICKEN", "22"],
  ["KARAHI CHICKEN", "22"],
  ["MADRAS CHICKEN", "22"],
  ["SAAG CHICKEN", "22"],
  ["CHICKEN JALFREZI", "22"],
  ["CHICKEN KORMA", "22"],
  ["CHIKCEN VINDALOO", "22"],
  ["CHICKEN CURRY (INDIAN STYLE)", "22"],
  ["LAMB PUMPKIN AND MUSHROOM CURRY", "24"],
  ["BHUNA LAMB", "25"],
  ["HIMALAYAN HANDI LAMB", "25"],
  ["LAMB DO PIAZA", "24"],
  ["BUTTER LAMB", "24"],
  ["LAMB MADRAS", "24"],
  ["SAAG LAMB", "24"],
  ["LAMB KORMA", "24"],
  ["LAMB ROGAN JOSH", "24"],
  ["LAMB DHANSAAG", "25"],
  ["HIMALAYAN HANDI GOAT", "25"],
  ["DHANSAAG GOAT", "25"],
  ["ROGAN JOSH", "25"],
  ["GOAT CURRY (INDIAN STYLE)", "25"],
  ["BEEF MADRAS", "23"],
  ["SAAG BEEF", "23"],
  ["BEEF KORMA", "23"],
  ["BEEF ROGAN JOSH", "23"],
  ["BEEF VINDALOO", "23"],
  ["BUTTER SCALLOPS", "28"],
  ["BUTTER PRAWNS", "25"],
  ["PRAWNS MASALA", "25"],
  ["PRAWNS MALABARI", "25"],
  ["PRAWN PASANDA", "25"],
  ["FISH MASALA", "25"],
  ["GOAN FISH CURRY", "25"],
  ["PANEER BALTI", "22"],
  ["BUTTER PANEER MASALA", "22"],
  ["PALAK PANEER", "21"],
  ["BUTTER VEGETABLES", "21"],
  ["CHILLI PANEER (SEMI DRY / GRAVY)", "21"],
  ["KARAHI PANEER", "21"],
  ["DAAL MAKHANI", "21"],
  ["NAVRATTAN KORMA", "21"],
  ["ALOO GOBI", "21"],
  ["BOMBAY ALOO", "20"],
  ["TARKA DAAL", "20"],
  ["SAAG ALOO", "21"],
  ["CHANA MASALA", "20"],
  ["MUTTER PANEER", "21"],
  ["MALAI KOFTA", "22"],
  ["VEGETARIAN JALFREZI", "21"],
  ["CHICKEN BIRYANI", "22"],
  ["LAMB BIRYANI", "24"],
  ["VEGETABLE BIRYANI", "21"],
  ["PULAV RICE", "10"],
  ["CAULIFLOWER FRIED RICE", "15"],
  ["ZEERA RICE", "5"],
  ["PLAIN RICE", "5"],
  ["NAAN", "4.5"],
  ["GARLIC NAAN", "5"],
  ["CHEESE AND GARLIC NAAN", "7"],
  ["CHEESE NAAN", "6.5"],
  ["KASHMIRI NAAN", "7"],
  ["VEGETABLE NAAN", "7"],
  ["DELHI NAAN", "5.5"],
  ["ROTI", "4.5"],
  ["KEEMA NAAN", "7"],
  ["CHICKEN & CHEESE NAAN", "7"],
  ["ONION KULCHA", "6"],
  ["CHOCOLATE NAAN", "7"],
  ["LACHHA PARATHA", "6"],
  ["CHICKEN NUGGETS AND CHIPS", "13"],
  ["BUTTER CHICKEN|kids-menu", "16"],
  ["LEMON & HONEY CHICKEN", "16"],
  ["RAITA MINT SAUCE", "5"],
  ["PICKLES TAMARIND SAUCE", "5"],
  ["SWEET MANGO CHUTNEY", "5"],
  ["PAPADOM (4 PCS)", "5"],
  ["INDIAN SALAD", "14"],
  ["KACHUMBER SALAD", "12"],
]);

const additions = {
  "signature-entree": [
    {
      dish_name: "HAKKA NOODLES",
      dish_description: toHtml(
        "Wok-tossed noodles stir-fried with fresh vegetables and authentic Indo-Chinese seasonings for a delicious smoky flavour.",
      ),
      dish_price: "VEG $20 / CHICKEN $22 / PRAWN $25",
      dietry_information: [],
    },
    {
      dish_name: "TIMMUR CHICKEN",
      dish_description: toHtml(
        "Succulent chicken cooked with aromatic Himalayan spices and the distinctive zing of authentic timmur pepper.",
      ),
      dish_price: "25",
      dietry_information: [],
    },
    {
      dish_name: "CHICKEN 65",
      dish_description: toHtml(
        "Tender chicken marinated in traditional South Indian spices, lightly battered, fried until golden, and finished with fragrant curry leaves and fresh chilli.",
      ),
      dish_price: "22",
      dietry_information: [],
    },
    {
      dish_name: "CHICKEN LOLLIPOP",
      dish_description: toHtml(
        "Chicken wings coated with spicy red batter mix of special great spice and Szechuan sauce.",
      ),
      dish_price: "23",
      dietry_information: [],
    },
    {
      dish_name: "AMRITSARI FISH",
      dish_description: toHtml(
        "Boneless Fish, spiced gram flour batter and deep-fried till the outside is crunchy and fish inside is soft and melt in the mouth.",
      ),
      dish_price: "21",
      dietry_information: [],
    },
    {
      dish_name: "PANEER TIKKA",
      dish_description: toHtml(
        "Cottage cheese skewered with green capsicum, tomatoes, onions, marinated with lemon juice, great spices cooked in tandoori oven.",
      ),
      dish_price: "23",
      dietry_information: ["glutenFree", "vegetarian"],
    },
    {
      dish_name: "PANEER PAKORA",
      dish_description: toHtml(
        "Marinated Indian cheese dipped in a batter of chickpea and Great Spice recipe.",
      ),
      dish_price: "18",
      dietry_information: ["vegetarian"],
    },
    {
      dish_name: "SOYA CHAAP (TANDOORI AND CHILLI)",
      dish_description: toHtml(
        "Soybean chunks and flour, coated in tandoori masala, and grilled to serve. Choose your way of Flavor from Tandoor or Pan fried.",
      ),
      dish_price: "21",
      dietry_information: ["vegetarian"],
    },
    {
      dish_name: "MUSHROOM CHILLI DRY/ GRAVY",
      dish_description: toHtml(
        "Chilli Mushroom is a classic Indo-Chinese snack, Made with deep fried mushrooms coated with soy sauce, corn flour, salt and pepper and Special Great Spice.",
      ),
      dish_price: "23",
      dietry_information: ["vegetarian", "vegan", "dairyFree"],
    },
    {
      dish_name: "VEGETARIAN MANCHURIAN",
      dish_description: toHtml(
        "Chopped mixed vegetables tossed with corn flour base, ginger, garlic & garnish with fresh herbs.",
      ),
      dish_price: "21",
      dietry_information: ["vegetarian", "vegan", "dairyFree"],
    },
    {
      dish_name: "MURG KALIMIRCH KEBAB - HALF",
      dish_description: toHtml(
        "Tendered boneless chicken marinated in paprika and yoghurt, roasted in tandoori oven garnished with salad.",
      ),
      dish_price: "17",
      dietry_information: ["glutenFree"],
    },
    {
      dish_name: "MURG KALIMIRCH KEBAB - FULL",
      dish_description: toHtml(
        "Tendered boneless chicken marinated in paprika and yoghurt, roasted in tandoori oven garnished with salad.",
      ),
      dish_price: "26",
      dietry_information: ["glutenFree"],
    },
  ],
  "mains-chicken": [
    {
      dish_name: "CHEF'S SPECIAL TIMMUR CHICKEN",
      dish_description: toHtml(
        "Tender chicken slow-cooked in a rich Himalayan curry infused with authentic timmur pepper, creating one of chef's signature dishes.",
      ),
      dish_price: "25",
      dietry_information: [],
    },
    {
      dish_name: "THAI-STYLE BASIL CHICKEN",
      dish_description: toHtml(
        "Fresh vegetables stir-fried with garlic, Thai basil, and chilli, served with chicken.",
      ),
      dish_price: "25",
      dietry_information: [],
    },
  ],
  "mains-lamb": [
    {
      dish_name: "CHEF'S SPECIAL TIMMUR LAMB",
      dish_description: toHtml(
        "Tender lamb slow-cooked in a rich Himalayan curry infused with authentic timmur pepper, creating one of chef's signature dishes.",
      ),
      dish_price: "27",
      dietry_information: [],
    },
  ],
  "mains-seafood": [
    {
      dish_name: "THAI-STYLE BASIL PRAWNS",
      dish_description: toHtml(
        "Fresh vegetables stir-fried with garlic, Thai basil, and chilli, served with prawns.",
      ),
      dish_price: "27",
      dietry_information: [],
    },
    {
      dish_name: "THAI-STYLE BASIL SCALLOPS",
      dish_description: toHtml(
        "Fresh vegetables stir-fried with garlic, Thai basil, and chilli, served with scallops.",
      ),
      dish_price: "30",
      dietry_information: [],
    },
  ],
  "mains-vegetarian": [
    {
      dish_name: "PANEER MUTTER METHI MALAI",
      dish_description: toHtml(
        "Cottage cheese cooked with peas, fenugreek in creamy sauce with Chef special spices.",
      ),
      dish_price: "22",
      dietry_information: ["vegetarian"],
    },
  ],
};

const runCurl = (args, options = {}) => {
  const output = execFileSync("curl", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });

  return output;
};

const cookieJar = path.join(os.tmpdir(), `wp-cookies-${Date.now()}.txt`);

runCurl(["-s", "-c", cookieJar, `${CMS_URL}/wp-login.php`]);
runCurl([
  "-s",
  "-c",
  cookieJar,
  "-b",
  cookieJar,
  "-L",
  `${CMS_URL}/wp-login.php`,
  "-d",
  `log=${encodeURIComponent(username)}&pwd=${encodeURIComponent(password)}&wp-submit=Log+In&redirect_to=${encodeURIComponent(`${CMS_URL}/wp-admin/post.php?post=${MENU_ID}&action=edit`)}&testcookie=1`,
]);

const editPage = runCurl([
  "-s",
  "-b",
  cookieJar,
  `${CMS_URL}/wp-admin/post.php?post=${MENU_ID}&action=edit`,
]);

const nonceMatch = editPage.match(/createNonceMiddleware\( "([^"]+)" \)/);
if (!nonceMatch) {
  throw new Error("Could not find WordPress REST nonce");
}

const nonce = nonceMatch[1];

const currentRaw = runCurl([
  "-s",
  "-b",
  cookieJar,
  "-H",
  `X-WP-Nonce: ${nonce}`,
  `${CMS_URL}/wp-json/wp/v2/menu/${MENU_ID}?context=edit&acf_format=standard`,
]);

fs.writeFileSync("/tmp/takeaway-menu-before.json", currentRaw);

const current = JSON.parse(currentRaw);
const menuGroups = current.acf.menu_group.map((group) => ({
  menu_image: group.menu_image?.id || group.menu_image?.ID || group.menu_image || null,
  menu_category: group.menu_category?.value || group.menu_category || null,
  menu_item: (Array.isArray(group.menu_item) ? group.menu_item : [])
    .filter((item) => item && normalizeName(item.dish_name))
    .map((item) => ({
      dish_name: item.dish_name || "",
      dish_description: item.dish_description || "",
      dish_price: item.dish_price || "",
      dietry_information: Array.isArray(item.dietry_information)
        ? item.dietry_information.map((info) => info?.value || info).filter(Boolean)
        : [],
    })),
}));

const globalExistingNames = new Set();
for (const group of menuGroups) {
  for (const item of group.menu_item) {
    globalExistingNames.add(normalizeName(item.dish_name));
  }
}

for (const group of menuGroups) {
  for (const item of group.menu_item) {
    const scopedKey = `${normalizeName(item.dish_name)}|${group.menu_category}`;
    item.dish_price =
      priceUpdates.get(scopedKey) ??
      priceUpdates.get(normalizeName(item.dish_name)) ??
      item.dish_price;
  }
}

for (const group of menuGroups) {
  const additionsForGroup = additions[group.menu_category] || [];

  for (const addition of additionsForGroup) {
    const normalized = normalizeName(addition.dish_name);
    if (globalExistingNames.has(normalized)) {
      continue;
    }

    group.menu_item.push(addition);
    globalExistingNames.add(normalized);
  }
}

const payload = {
  acf: {
    menu_extra_information: current.acf.menu_extra_information,
    menu_group: menuGroups,
  },
};

fs.writeFileSync(
  "/tmp/takeaway-menu-payload.json",
  JSON.stringify(payload, null, 2),
);

const response = runCurl([
  "-s",
  "-b",
  cookieJar,
  "-H",
  `X-WP-Nonce: ${nonce}`,
  "-H",
  "Content-Type: application/json",
  "-X",
  "POST",
  `${CMS_URL}/wp-json/wp/v2/menu/${MENU_ID}`,
  "--data-binary",
  "@/tmp/takeaway-menu-payload.json",
]);

fs.writeFileSync("/tmp/takeaway-menu-response.json", response);

const updated = JSON.parse(response);
if (updated.id !== MENU_ID) {
  throw new Error("Unexpected WordPress response while updating takeaway menu");
}

const summary = menuGroups.map((group) => ({
  category: group.menu_category,
  items: group.menu_item.length,
}));

console.log(JSON.stringify(summary, null, 2));
