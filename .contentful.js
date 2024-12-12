require('dotenv').config();  // Load environment variables from .env file

const contentful = require('contentful');

module.exports = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: 'master'
});
