import React from 'react'
import { Auth } from 'aws-amplify';

export default function Welcome(props) {

  const { setLogged } = props;

  function logoutUser() {
    Auth.signOut()
      .then(() => {
        setLogged(false);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='page-container'>
      <div className='logged-content'>
        <h1>You are successfully logged!</h1>
        <button className='regular-button form-button' onClick={logoutUser}>Log out</button>
      </div>
    </div>
  )
}
