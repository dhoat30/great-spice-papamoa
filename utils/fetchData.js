const { google } = require('googleapis');

// new way of doing it 
//get single post with slug 
export const getSinglePostData = async (slug, apiRoute, revalidation = 60 * 60 * 24 ) => {

 
    let response = await fetch(`${process.env.url}/${apiRoute}?slug=${slug}&acf_format=standard`, {
        next: { revalidate: revalidation },
    });
    let data = await response.json();
    return data
}

// get single post data using post id 
export const getSinglePostDataWithID = async (id, apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}/${id}?acf_format=standard`, {
        next: { revalidate: 60 * 60 * 24 },
    });
    let data = await response.json();
    return data
}

//get all posts 
export const getAllPosts = async (apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 * 60 * 24 },
    });
    let data = await response.json();
    return data
}


export const getOptions = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/options/all`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}


// get reivews 
export const getGoogleReviews = async () => {
    // Add revalidation logic
    const nextRevalidateOptions = { next: { revalidate: 30 * 86400 } }; // Revalidate every 30 days

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accountId = process.env.GOOGLE_ACCOUNT_ID;
    const locationId = process.env.GOOGLE_LOCATION_ID;

    let allReviews = [];
    let nextPageToken = null;

    do {
        // Fetch reviews from the API
        const response = await oauth2Client.request({
            url: `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
            method: "GET",
            params: {
                pageToken: nextPageToken, // Use the nextPageToken for pagination
            },
            ...nextRevalidateOptions, // Pass the revalidate option here
        });

        // Combine the fetched reviews with existing ones
        allReviews = [...allReviews, ...(response.data.reviews || [])];
        nextPageToken = response.data.nextPageToken; // Set the nextPageToken for the next iteration
    } while (nextPageToken); // Continue until there's no nextPageToken

    return allReviews;
};
//get projects 
// export const getProjects = async () => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?acf_format=standard&per_page=100`, {
//         next: { revalidate: 60 * 60 * 24 },
//     });
//     let data = await fetchData.json();
//     return data
// }

//fetch work categories 
// export const getProjectCategories = async () => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work-category`, {
//         next: { revalidate: 60 * 60 * 24 },
//     });
//     let data = await fetchData.json();
//     return data
// }

// fetch single project 
// export const getSingleProject = async (slug) => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?slug=${slug}&acf_format=standard`, {
//         next: { revalidate: 60 * 60 * 24 },
//     });
//     let data = await fetchData.json();
//     return data
// }



//get service packages  
export const getCommercialServices = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 * 60 * 24 },
    });
    let data = await fetchData.json();
    return data
}

export const getSingleCommercialService = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 * 60 * 24 },
    });
    let data = await fetchData.json();
    return data
}
// get single service package 

// get all blogs  
export const getBlogsData = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 * 60 * 24 },
    });
    let data = await fetchData.json();
    return data
}
// get single blog data 
export const getSingleBlog = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 * 60 * 24 },
    });
    let data = await fetchData.json();
    return data
}

