require('dotenv').config();

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
console.log("google client id", process.env.GOOGLE_CLIENT_ID)
console.log("google client secret", process.env.GOOGLE_CLIENT_SECRET)
console.log("google refresh token", process.env.GOOGLE_REFRESH_TOKEN)
console.log("Refresh Token:", process.env.GOOGLE_REFRESH_TOKEN);
async function fetchAccountId() {
  try {
     // Initialize the My Business Account Management API
     const myBusinessAccountManagement = google.mybusinessaccountmanagement({
      version: 'v1',
      auth: oauth2Client,
    });

    // Fetch accounts
    const response = await myBusinessAccountManagement.accounts.list();
    console.log('Accounts:', response);

    // Extract the Account ID
    const accountId = response.data.accounts[0].name.split('/')[1];
    console.log('Your Google Account ID:', accountId);
  } catch (error) {
    console.error('Error fetching Account ID:', error.message);
  }
}

fetchAccountId();
