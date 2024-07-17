import React from 'react';
import './Loading.css'; // Import the CSS file for styling

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-message">
        Hold on till we get your data...
      </div>
    </div>
  );
}

export default Loading;
