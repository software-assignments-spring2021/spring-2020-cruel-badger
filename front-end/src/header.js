import React, { Component,  useState, useEffect }from 'react';
import ReactDOM from 'react-dom';
import './header.css';
import Sidebar from './sidebar';
import axios from "axios";
import { Redirect } from 'react-router-dom';

const Header = (props) => {
	let [validUser, setValidUser] = useState();
	const user = {
      username: localStorage.username,
      email: localStorage.email,
      token: localStorage.token
    };
	useEffect(() => {
    //console.log("in use effect in header page");
    //console.log(user);
    axios({"method":"POST", "url":"http://localhost:4000/checkSession", "headers":{"content-type": "application/x-www-form-urlencoded"
		}, data: user}).then(res => {
	        //console.log(res);
	        //console.log(res.data);
	        //console.log("======in header");
	        //console.log(res.data);
	        setValidUser(res.data);
	});
  }, []);

	const handleClick = event => {
		localStorage.clear();
		// localStorage.removeItem("username");
		// localStorage.removeItem("email");
		// localStorage.removeItem("token");
		axios({"method":"GET", "url":"http://localhost:4000/logout"});
		window.location.href = "/";
	}

	if(validUser == true) {
		return (
		    <div className="header">
		      <Sidebar/>
		      <img id="logo" src="../logo3.png"/>

		      <a href="/"><h1 id="title">BROKE MILLENNIAL</h1></a>

		      <a id="corner-login" onClick={handleClick}> Log Out </a>

		    </div>
		);	
	}
	else {
		return (
		    <div className="header">
		      <Sidebar/>
		      <img id="logo" src="../logo3.png"/>

		      <a href="/"><h1 id="title">BROKE MILLENNIAL</h1></a>

		      <a id="corner-login" href="/log-in"> Log In </a>

		    </div>
		);
	}
}



export default Header;

