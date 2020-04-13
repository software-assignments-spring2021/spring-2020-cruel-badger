import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import './header.css';
import Sidebar from './sidebar';

const Header = (props) => {
  return (
    <div className="header">
      <Sidebar/>
      <img id="logo" src="../logo3.png"/>

      <a href="/"><h1 id="title">BROKE MILLENNIAL</h1></a>

      <a id="corner-login" href="/log-in"> Log In </a>

    </div>
    );
}



export default Header;

