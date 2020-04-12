import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './App.css';
import Sidebar from './sidebar';
import Header from './header';

function App() {
  return (
    <div className="content">
    <Header />
      <div className="indexTopContent">
        <h3 id="intro">Let Us Help You Plan Your Future! </h3>

        <p className="blurb" id="blurb-top"> Not sure if you should take that job offer in Seattle? Want to see if you can afford a vacation in Hawaii? Buying a car? These are all things we can help you with!</p>

        <a className="blurb" id="getstarted" href="/create-future">Click Here to Get Started</a> 
      </div>

      <div className="midContent">
        <h3 id="howworks"> How It Works </h3>

        <img src="./howworks.png" id="howworkspic"/> 

      </div>


  </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root') );

export default App;
