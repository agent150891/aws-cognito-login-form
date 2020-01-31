import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import App from './App';

Amplify.configure({
  Auth: {
    // Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_AWS_POOL_ID,
    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_AWS_CLIENT_ID,
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
