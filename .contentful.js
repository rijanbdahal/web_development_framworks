require('dotenv').config();  // Load environment variables from .env file

const contentful = require('contentful');

module.exports = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,  // Load space ID from environment variable
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: 'master'// Load access token from environment variable
});
