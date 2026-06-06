require('dotenv').config();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

async function fetchAllLocations() {
  try {
    const businessInfo = google.mybusinessbusinessinformation({
      version: 'v1',
      auth: oauth2Client,
    });

    const accountId = process.env.GOOGLE_ACCOUNT_ID;
    let locations = [];
    let nextPageToken = null;

    do {
      const response = await businessInfo.accounts.locations.list({
        parent: `accounts/${accountId}`,
        readMask: 'name,title', // Specify the fields to retrieve
        pageSize: 100, // Maximum allowed page size
        pageToken: nextPageToken, // Pass the token to get the next page
      });

      if (response.data.locations) {
        locations = locations.concat(response.data.locations); // Add the fetched locations
      }

      nextPageToken = response.data.nextPageToken; // Update the token for the next page
    } while (nextPageToken); // Continue until there are no more pages

    console.log('All Locations:', locations);
  } catch (error) {
    console.error('Error fetching locations:', error.response?.data || error.message);
  }
}

fetchAllLocations();