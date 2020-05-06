import ReactDOM from 'react-dom';
import React, {Component, useState}from 'react';
import Header from "./header.js";
import axios from "axios"
import { Redirect, Link, useHistory } from "react-router-dom";

import './Signup.css';



function Signup(props) {
	let [errMessEmail, setErrMessEmail] = useState("");
	let [errMessPass, setErrMessPass] = useState("");

	const history = useHistory();
  let state = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  const handleChange = event => {
  	const value = event.target.value;
    state[event.target.name] = value;
  }

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: state.username,
      email: state.email,
      password: state.password,
      password_confirmation: state.password2
    };

	axios({"method":"POST", "url":"http://localhost:4000/signup", "headers":{"content-type": "application/x-www-form-urlencoded"
		}, data: user}).then(res => {

	        console.log(res);
	        if (res.data.success) {
	        	history.push({
				 	pathname: "/log-in"
				})
	        }

	        else {
	        	console.log(JSON.stringify(res.data.data.errors));
	        	if (res.data.data.errors.email) {
	        		setErrMessEmail(JSON.stringify(res.data.data.errors.email));
	        	}
	        	if (res.data.data.errors.password) {
	        		setErrMessPass(JSON.stringify(res.data.data.errors.password));
	        	}
	        }

	        //console.log(res.data);
	   //      if (res.status >= 200 && res.status < 400){
	   //      	history.push({
				// 	pathname: "/log-in"
				// })
	   //      }
	        	
	        
	})
  }
	return (
	  	<div className="signuppage">
	 	<Header/>
			<div id="signupmainchunk">
				<h1 id="signuph1">Sign Up</h1>
				<p id="signupaccess"> This will allow you to save future paths so you can access them again </p>
				<div id="signupform">
				<form onSubmit={handleSubmit} action="">
					<p className="formstuff">Email:</p>
					<input type="email" name="email" defaultValue="" onChange={handleChange}/> 

					<p className="formstuff">Username:</p>
					<input type="text" name="username" defaultValue="" onChange={handleChange}/> 

					<p className="formstuff">Password:</p>
					<input type="password" name="password" defaultValue="" onChange={handleChange}/> 

					<p className="formstuff">Confirm Password:</p>
					<input type="password" id="bottominput" name="password2" defaultValue="" onChange={handleChange}/> 

					<input type="submit" id="submit" name="Submit" onclick={popup} />
				</form>
				</div>
				<p id="passErr">{errMessPass}</p>
				<p id="emailErr">{errMessEmail}</p>
				
				<p id="haveacct">Have an account already? Login <a id="loginlink" href="/log-in">here</a></p>
			</div>

	  	</div>
	);
}

function popup(){
		if(window.confirm("Sign up successful. Please login.")){}
}

export default Signup;
