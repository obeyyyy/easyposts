// src/app/X/postweet.jsx
import { NextResponse } from 'next/server';
import TwitterLite  from 'twitter-lite';

const client = new TwitterLite({
  consumer_key: 'XDUyK92Cfp0b46BNp62XC3Sdf',
  consumer_secret:'v4EttABN1rDcicWaKSbD64oClEvtqelKGEdtry6IxP7Y8E2IWW',
  access_token_key: '1516183210648035334-loJRX8az5lFU3Ojq1cyYpHnvfmWsBi',
  access_token_secret: 'ZIlKkOeFzkVUjzKCdOLd1tGEuOOPTjcgi0OgY4L5hlFf6'
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is missing' }, { status: 400 });
    }

    const twitterResponse = await client.post('statuses/update', { status: message });

    if (twitterResponse) {
      return NextResponse.json(twitterResponse);
    } else {
      return NextResponse.json({ error: 'Failed to post tweet' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
