import React, { useState } from 'react';
import Login from './components/Login'
import Welcome from './components/Welcome'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './main.css'

function App() {

  const [isSignUp, setSignUp] = useState(false);
  const [isLogged, setLogged] = useState(false);

  return (
    <div className="App">
      {
        isLogged
          ? null
          : (
            <div className='button-panel'>
              <button className='regular-button' onClick={() => setSignUp(false)}>Sign in</button>
              <button className='regular-button' onClick={() => setSignUp(true)}>Sign up</button>
            </div>
          )
      }
      {
        isLogged
          ? <Welcome setLogged={setLogged} />
          : <Login isSignUp={isSignUp} setSignUp={setSignUp} setLogged={setLogged} />
      }
    </div>
  );
}

export default App;
