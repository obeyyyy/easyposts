import React, { useState } from 'react';
import { getAuth, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from '../firebase';

const FacebookPage = () => {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState('');


  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      provider.addScope('public_profile');
      provider.addScope('email');
      await signInWithPopup(auth, provider);
      setUser(auth.currentUser);
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
    }
  };



  const fetchPageAccessToken = async () => {
    try {
      const accessToken = user.accessToken; // The user's access token from the sign-in process
      const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
      const data = await response.json();
  
      if (data.data && data.data.length > 0) {
        const pageToken = data.data[0].access_token; // Assuming the first page in the list
        return pageToken;
      } else {
        console.error('No pages found for this user.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching page access token:', error);
      return null;
    }
  };

  const postToFacebookPage = async (pageToken, message) => {
    try {
      const response = await fetch(`https://graph.facebook.com/{page-id}/feed`, {
        method: 'POST',
        body: JSON.stringify({
          message: message, // The message you want to post
          access_token: pageToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (data.id) {
        console.log('Post created successfully with ID:', data.id);
      } else {
        console.error('Error creating post:', data);
      }
    } catch (error) {
      console.error('Error posting to Facebook page:', error);
    }
  };

  const postMessage = async () => {
    const pageToken = await fetchPageAccessToken();
    if (pageToken) {
      await postToFacebookPage(pageToken, message);
    }
  };
  
  

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here" />
          <button onClick={postMessage}>Post to Facebook Page</button>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithFacebook}>Login with Facebook</button>
        </div>
      )}
    </div>
  );
};

export default FacebookPage;
