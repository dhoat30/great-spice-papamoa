const THIRTY_DAYS = 60 * 60 * 24 * 30;
const cachedFetch = async (url, revalidate = THIRTY_DAYS) => {
  const res = await fetch(url, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${url}`);
  }

  return res.json();
};

export const getSinglePostData = async (slug, apiRoute) => {
  return cachedFetch(
    `${process.env.url}/${apiRoute}?slug=${slug}&acf_format=standard`,
  );
};

// get single post data using post id
export const getSinglePostDataWithID = async (id, apiRoute) => {
  return cachedFetch(
    `${process.env.url}/${apiRoute}/${id}?acf_format=standard`,
  );
};

//get all posts
export const getAllPosts = async (apiRoute) => {
  return cachedFetch(
    `${process.env.url}/${apiRoute}?acf_format=standard&per_page=100`,
  );
};

export const getOptions = async () => {
  return cachedFetch(`${process.env.url}/wp-json/options/all`);
};

//get service packages
export const getCommercialServices = async () => {
  return cachedFetch(
    `${process.env.url}/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100`,
  );
};

export const getSingleCommercialService = async (slug) => {
  return cachedFetch(
    `${process.env.url}/wp-json/wp/v2/commercial-cleaning?slug=${slug}&acf_format=standard`,
  );
};
// get single service package

// get all blogs
export const getBlogsData = async () => {
  return cachedFetch(
    `${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`,
  );
};

export const getSingleBlog = async (slug) => {
  return cachedFetch(
    `${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`,
  );
};

// get reivews
export const getGoogleReviews = async () => {
  const baseUrl = process.env.siteUrl; // Change this in production

  const res = await fetch(`${baseUrl}/api/google-reviews`, {
    next: { revalidate: 2592000 },
  });

  if (!res.ok) {
    console.log("failed to retch");
    return [];
  }
  return res.json();
};
