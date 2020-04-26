import ReactDOM from 'react-dom';
import React, {Component}from 'react';
import Header from "./header.js";


import './Login.css';
import {
    Button,
    Form,
    EmailInput,
    Password,
    TextBox
  } from 'react-form-elements';


function Login(props) {
	return(
		<div className="loginpage">
		<Header/>
			<div id="loginmainchunk">
				<h1 id="loginh1">Login</h1>
				<p id="loginaccess"> This will allow you to access your dashboard containing your saved future paths </p>
				<div id="loginform">
					<form action="/submit-login" method="POST">

					<p className="formstuff">Username:</p>
					<input type="text" name="username" defaultValue="" /> 

					<p className="formstuff">Password:</p>
					<input type="password" name="password" defaultValue="" id="bottominput" /> 

					<input type="submit" id="submit" name="Submit"/>

					</form>

				</div>

				<p id="donthaveacct">Don't have an account? Sign up <a id="signuplink" href="/sign-up">here</a></p>
			</div>
		</div>

	);
}

export default Login;