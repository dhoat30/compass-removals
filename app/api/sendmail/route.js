
import { NextResponse } from 'next/server'

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;

export async function GET(req, res) {
  const response = await res.json();

  return NextResponse.json(response)
}

export async function POST(req, res) {
  const { email, message, formName } = await req.json();

  // Mailgun API endpoint
  const url = `https://api.mailgun.net/v3/${DOMAIN}/messages`;
  // Prepare the form data as URL encoded
  const formData = new URLSearchParams();
  formData.append('from', email);
  formData.append('to', process.env.EMAIL_ADDRESS);
  formData.append('subject', formName);
  formData.append('text', `${message}`);


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json({ message: "Failed", success: false, data: data }, {status: response.status});

    }

    // Use NextApiResponse type for auto-completion and proper response typing

    return NextResponse.json({ message: "This Worked", success: true, data: data },{ status: 200});

  } catch (error) {
    console.error(error);
    const err = await error.json();
    return NextResponse.json({ message: err, success: false }, {status: 400});
  }
};