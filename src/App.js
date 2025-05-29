import React from 'react';

function App() {
  return (
    <div>
      <h1>EC2 Lab Terminal</h1>
      <iframe
        src="http://100.26.203.101/terminal/"
        title="Student Terminal"
        style={{
          width: '100%',
          height: '600px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      ></iframe>
    </div>
  );
}

export default App;
