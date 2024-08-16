import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessToken, message } = req.body;

    try {
      const response = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from Twitter API:', errorData);
        return res.status(response.status).json({ error: errorData });
      }

      const data = await response.json();
      console.log('Tweet posted successfully:', data);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error posting to Twitter:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
