require('dotenv').config();
const { google } = require('googleapis');

// Debugging: Check if the variables are loaded
console.log("google client id:", process.env.GOOGLE_CLIENT_ID);
console.log("google client secret:", process.env.GOOGLE_CLIENT_SECRET);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000' // Redirect URI
);

// Generate the URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Ensures a refresh token is provided
  scope: ['https://www.googleapis.com/auth/business.manage'], // Add required scopes
});

console.log('Authorize this app by visiting this URL:', authUrl);
