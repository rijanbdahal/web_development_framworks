//I am using Axios to make HTTP requests

// Importing the axios library for making HTTP requests
const axios = require('axios');
console.log("API Req");
module.exports = async function() {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCdJTdKTQVmsjuz1mWCHcYlqXqQZHCcmIE&channelId=UC3wNzfbOH9NrX55uYmFSCTA&part=snippet&type=video&order=date&maxResults=5');  
    console.log("API Req");
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};