// src/app/X/postweet.jsx
import { NextResponse } from 'next/server';
import TwitterLite  from 'twitter-lite';

const client = new TwitterLite({
  consumer_key: 'XDUyK92Cfp0b46BNp62XC3Sdf',
  consumer_secret:'v4EttABN1rDcicWaKSbD64oClEvtqelKGEdtry6IxP7Y8E2IWW',
  access_token_key: '1516183210648035334-loJRX8az5lFU3Ojq1cyYpHnvfmWsBi',
  access_token_secret: 'ZIlKkOeFzkVUjzKCdOLd1tGEuOOPTjcgi0OgY4L5hlFf6'
});


export async function POST(req, res) {
  try {
    const { message } = await req.json();

    if (!message) {
      return res.status(400).json({ error: 'Message is missing' });
    }

    // Post the tweet
    const twitterResponse = await client.post('statuses/update', { status: message });

    // Check if response is valid
    if (twitterResponse && twitterResponse.text) {
      return res.status(200).json(twitterResponse);
    } else {
      return res.status(500).json({ error: 'Failed to post tweet' });
    }

  } catch (error) {
    // Log detailed error
    console.error('Error in API route:', error);

    // Return detailed error message
    return res.status(500).json({
      error: {
        message: error.message,
        stack: error.stack
      }
    });
  }
}