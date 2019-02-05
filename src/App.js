import React from 'react';
import logo from './logo.svg';
import Email from './email';

import './app.css';

const app = () => { 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/app.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React v{React.version}
        </a>
        
      </header>
    </div>
  );
}

export default app;
