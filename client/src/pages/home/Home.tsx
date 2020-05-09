import React from 'react';
import logo from './logo.png';
import './Home.css';

const Home: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          product catalog!
        </p>
        <a
          className="App-link"
          href="https://www.gattoni.cl"
          target="_blank"
          rel="noopener noreferrer"
        >
          gattoni.cl v1
        </a>
      </header>
      <main>
        Home page
      </main>
    </div>
  );
}

export default Home;