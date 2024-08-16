// src/app/X/postweet.jsx
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { accessToken, message } = await request.json();
    
    if (!accessToken || !message) {
      return NextResponse.json({ error: 'Missing accessToken or message' }, { status: 400 });
    }

    // Call Twitter API to post the tweet
    const twitterResponse = await fetch('https://api.x.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ text: message }),
    });

    if (!twitterResponse.ok) {
      const errorData = await twitterResponse.json();
      return NextResponse.json({ error: errorData }, { status: twitterResponse.status });
    }

    const twitterData = await twitterResponse.json();
    return NextResponse.json(twitterData);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
