import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="fixed top-0 right-0 left-0 z-50">
      <LoadingBar style={{ backgroundColor: '#4e4eec', height: '3px' }} />
    </div>
  );
}

export default Loading;
