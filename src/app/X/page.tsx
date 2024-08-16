"use client"
import React, { useState } from 'react';
import { getAuth, signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure the correct path

const TwitterPage = () => {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const signInWithTwitter = async () => {
    const provider = new OAuthProvider('twitter.com');
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = OAuthProvider.credentialFromResult(result);

      if (credential) {
        console.log('Credential:', credential); // Log credentials to debug
        setUser(auth.currentUser);
        setAccessToken(credential.accessToken ?? null); // Set access token, default to null if undefined
      }
    } catch (error) {
      console.error('Error during Twitter sign-in:', error);
    }
  };

  const postToTwitter = async (message: string) => {
    if (!accessToken) {
      console.error('No access token found.');
      return;
    }

    try {
      const response = await fetch('https://api.twitter.com/2/tweets', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
          text: message, // Correct field for Twitter API v2
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Use Bearer token
        },
      });

      const data = await response.json();
      if (data.data && data.data.id) {
        console.log('Tweet posted successfully with ID:', data.data.id);
      } else {
        console.error('Error posting tweet:', data);
      }
    } catch (error) {
      console.error('Error posting to Twitter:', error);
    }
  };

  const postMessage = async () => {
    if (message) {
      await postToTwitter(message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
          />
          <button onClick={postMessage}>Post to Twitter</button>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithTwitter}>Login with Twitter</button>
        </div>
      )}
    </div>
  );
};

export default TwitterPage;
