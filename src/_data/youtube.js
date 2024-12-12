//I am using Axios to make HTTP requests
require('dotenv').config();
// Importing the axios library for making HTTP requests
const axios = require('axios');
console.log("API Req");
module.exports = async function() {
  try {
    const response = await axios.get(`${process.env.GOOGLE_API}`);
    console.log("API Req");
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};