import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


let roomId = window.location.href.split('/')[4];
console.log('href', roomId);
ReactDOM.render(<App listingId={roomId}/>, document.getElementById('app'));
