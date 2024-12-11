require('dotenv').config();  // Load environment variables from .env file

const contentful = require('contentful');

module.exports = function(eleventyConfig) {
    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/_data/projects.json");  // Passthrough for JSON data
    eleventyConfig.addWatchTarget("./src/css/");

    // Define output directory
    eleventyConfig.addPassthroughCopy("./src/_data/projects.json");

    // Create a Contentful client using environment variables
    const client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID, // Using environment variable for space ID
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Using environment variable for access token
    });

    // Add collection to fetch data from Contentful for "Projects"
    eleventyConfig.addCollection('projects', async function() {
        try {
            const response = await client.getEntries({
                content_type: 'projects'  // 'projects' is your content type in Contentful
            });

            // Return the project items
            return response.items;
        } catch (error) {
            console.error("Error fetching data from Contentful:", error);
            return [];  // Return an empty array if there's an error
        }
    });

    // Add collection to fetch data from Contentful for "About Us"
    eleventyConfig.addCollection('aboutus', async function() {
        try {
            const response = await client.getEntries({
                content_type: 'aboutus'
            });
            return response.items;
        } catch (error) {
            console.error("Error fetching data from Contentful:", error);
            return [];  // Return an empty array if there's an error
        }
    });

    eleventyConfig.addCollection('sitelogo', async function() {
        try {
            const response = await client.getEntries({
                content_type: 'sitelogo'
            });

            // Return the "About Us" items
            return response.items;
        } catch (error) {
            console.error("Error fetching data from Contentful:", error);
            return [];  // Return an empty array if there's an error
        }
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
