require('dotenv').config();

const contentful = require('contentful');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/_data/projects.json");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/_data/projects.json");

    const client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    eleventyConfig.addCollection('projects', async function() {
        try {
            const response = await client.getEntries({
                content_type: 'projects'
            });

            return response.items;
        } catch (error) {
            console.error("Error fetching data from Contentful:", error);
            return [];
        }
    });
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

    eleventyConfig.addCollection('blogs', async function(){
       try{
           const response = await client.getEntries({
               content_type: 'blogs'
           }) ;
           return response.items
       }
       catch(error){
           console.error("Error fetching data from Contentful:", error);
           return [];
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
            output: "_site",
        },
    };
};
