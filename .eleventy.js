module.exports = function (eleventyConfig){

    
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/_data/projects.json");  // Add this line for JSON data
    eleventyConfig.addWatchTarget("./src/css/");

    return{
        dir:{
            "input": "src",
            "output": "public",
        },
    };
};
