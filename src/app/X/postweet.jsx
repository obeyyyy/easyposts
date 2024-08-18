// src/app/X/postweet.jsx
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { accessToken, message } = await request.json();
    
    console.log('Received data:', { accessToken, message }); // Log received data

    if (!accessToken || !message) {
      return NextResponse.json({ error: 'Missing accessToken or message' }, { status: 400 });
    }

    // Call Twitter API to post the tweet
    const twitterResponse = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,      },
      body: JSON.stringify({ text: message }),
    },
    console.log("data fetched"));

    const responseBody = await twitterResponse.text(); // Get raw response for debugging

    console.log('Twitter API response:', responseBody); // Log response body

    if (!twitterResponse.ok) {
      return NextResponse.json({ error: "twitter response is not OK : "+ responseBody }, { status: twitterResponse.status });
    }

    const twitterData = JSON.parse(responseBody); // Parse response if necessary
    return NextResponse.json(twitterData);

  } catch (error) {
    console.error('Error in API route:', error); // Log errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
