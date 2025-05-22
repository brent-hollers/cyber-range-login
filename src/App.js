import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [instanceIp, setInstanceIp] = useState('');

  const launchInstance = async (username) => {
    try {
      const resp = await fetch(
        `https://wt7lvmg8e3.execute-api.us-east-1.amazonaws.com/launch?username=${username}`
      );
      const ip = await resp.text();
      setInstanceIp(ip);
      console.log('EC2 launch response:', ip);
    } catch (err) {
      console.error('Error launching instance:', err);
    }
  };

  useEffect(() => {
    if (currentUser?.username) {
      launchInstance(currentUser.username);
    }
  }, [currentUser]);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (!currentUser && user) setCurrentUser(user);

        return (
          <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Welcome, {user.username}!</h1>
            <p>Your EC2 lab environment is launching (or resuming).</p>
            {instanceIp && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Your Instance IP:</strong> {instanceIp}<br />
                <code>ssh ubuntu@{instanceIp}</code>
              </div>
            )}
            <button onClick={signOut} style={{ marginTop: '2rem' }}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
  );
}

export default App;
