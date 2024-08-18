"use client";
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

  const postToTwitter = async () => {
    if (!accessToken || !message) {
      console.error('Access token or message is missing.');
      return;
    }
  
    try {
      const response = await fetch('/api/postweet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, message }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Tweet posted successfully:', data);
      } else {
        console.error('Error posting tweet:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
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
          <button onClick={postToTwitter}>Post to Twitter</button>
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
