import ReactDOM from 'react-dom';
import React, {Component}from 'react';
import Header from "./header.js";
import axios from "axios"


import './Signup.css';



function Signup(props) {
	return(
		<div className="signuppage">
		<Header/>
			<div id="signupmainchunk">
				<h1 id="signuph1">Sign Up</h1>
				<p id="signupaccess"> This will allow you to save future paths so you can access them again </p>
				<div id="signupform">
					<form action="/submit-signup" method="GET">
					<p className="formstuff">Email:</p>
					<input type="email" name="email" defaultValue=""/> 

					<p className="formstuff">Username:</p>
					<input type="text" name="username" defaultValue=""/> 

					<p className="formstuff">Password:</p>
					<input type="password" name="password" defaultValue=""/> 

					<p className="formstuff">Confirm Password:</p>
					<input type="password" id="bottominput" name="password2" defaultValue=""/> 

					<input type="submit" id="submit" name="Submit"/>
					</form>

				</div>

				<p id="haveacct">Have an account already? Login <a id="loginlink" href="/log-in">here</a></p>
			</div>
		</div>

	);
}


export default Signup;