import { NextResponse } from 'next/server'
import crypto from 'crypto';

const pixelId = process.env.FACEBOOK_PIXEL_ID;
const accessToken = process.env.FACEBOOK_CONVERSION_TOKEN;
const apiVersion = process.env.FACEBOOK_API_VERSION || 'v13.0';

export async function GET(req, res) {
    const response = await res.json();
  
    return NextResponse.json(response)
  }

  export async function POST(req, res) {
    const { data } = await req.json();
  // Basic validation
  if (!data) {
    return NextResponse.json({ message: "Missing required fields", success: false, data: data }, {status: 400});

  }  

 // Send event to Facebook CAPI
 try {
    await sendEventToFacebook(data, req );
    return NextResponse.json({ message: 'Form submitted successfully' , success: true }, {status: 200});

  } catch (error) {
    console.error('Error sending event to Facebook:', error);
    return NextResponse.json({ message: 'Internal Server Error'  , success: false }, {status: 500});

  }
 

  } 


  async function sendEventToFacebook(data, req) {
   
    const {event } = data
    const endpoint = `https://graph.facebook.com/${apiVersion}/${pixelId}/events`;
   // Capture Client User Agent and IP Address from the request
   const userAgent = req.headers.get('user-agent') || '';
   const xForwardedFor = req.headers.get('x-forwarded-for');
   const clientIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '';


   const userData = { 

   }
    // Prepare user data with SHA-256 hashing
  if (data.email) userData.em = hashData(data.email);
  if (data.firstName) userData.fn = hashData(data.firstName);
  if (data.phone) userData.ph = hashData(data.phone);
  if (data.county) userData.ct = data.county;
  
  // Include user agent and IP separately
  const clientInfo = {
    client_user_agent: userAgent,
    client_ip_address: clientIp,
  };

    // Define event-specific parameters
    let eventName = '';
    let customData = {};


    switch (event) {
        case 'Lead':
          eventName = 'Lead';
          customData = {
            county: data.county,
          };
          break;
        case 'ViewContent':
          eventName = 'ViewContent';
          customData = {
            content_name: data.contentName || '',
            content_category: data.contentCategory || '',
            // Add more custom parameters as needed
          };
          break;
        case 'Contact':
          eventName = 'Contact';
          customData = {
            county: data.county,
          };
          break;
        default:
          throw new Error('Unsupported event type');
      }
    const eventData = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: data.eventSourceUrl || '',
        action_source: 'website',
        user_data: userData,
        custom_data: customData,
        ...clientInfo,
      },
    ],
    access_token: accessToken,
  };

//   send request
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ message: `Facebook CAPI Error`, success: false, data: errorData }, {status: 400});

  }
  return response.json();

  }
  
  function hashData(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
  