import ReactDOM from 'react-dom';
import React, {Component}from 'react';
import Header from "./header.js";
import axios from "axios"


import './Signup.css';



function Signup(props) {
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
    // event.preventDefault();

    const user = {
      username: state.username,
      email: state.email,
      password: state.password,
      password2: state.password2
    };

	axios({"method":"POST", "url":"http://localhost:4000/signup", "headers":{"content-type": "application/x-www-form-urlencoded"
		}, data: user}).then(res => {
	        //console.log(res);
	        //console.log(res.data);
	})
  }
	return (
	  	<div className="signuppage">
	 	<Header/>
			<div id="signupmainchunk">
				<h1 id="signuph1">Sign Up</h1>
				<p id="signupaccess"> This will allow you to save future paths so you can access them again </p>
				<div id="signupform">
				<form onSubmit={handleSubmit} action="/log-in">
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

				<p id="haveacct">Have an account already? Login <a id="loginlink" href="/log-in">here</a></p>
			</div>

	  	</div>
	);
}

function popup(){
		if(window.confirm("Sign up successful. Please login.")){}
}

export default Signup;
