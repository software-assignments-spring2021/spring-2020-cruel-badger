import ReactDOM from 'react-dom';
import React, {Component}from 'react';
import Header from "./header.js";
import axios from "axios"

import './Login.css';


function Login(props) {
	let state = {
	    username: '',
	    password: '',
  	};

  const handleChange = event => {
  	//console.log("in login handle event");
  	const value = event.target.value;
  	//console.log(value);
  	//console.log(event.target.name)

    state[event.target.name] = value;
  }

  const handleSubmit = event => {
  	console.log("handle submit");
    event.preventDefault();
    // const user = {
    //   username: state.username,
    //   password: state.password,
    // };
    // console.log(state.username);
    // console.log(state.password);

    //console.log(user);

	axios({
		method: 'post',
		url: '/signin', 
		data: {
			username: state.username,
			password: state.password
		},
		headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
	}).then(res => {
			console.log("in login axios");
			//console.log(res);
			let token = res.data.token.split(" ")[1];
			console.log(token);
			localStorage.setItem("token", token);
	        //console.log(res);
	        
	        localStorage.setItem("username", res.data.user.username);
	        localStorage.setItem("email", res.data.user.email);
	        console.log(res.data.user.username);
	        window.location = '/dashboard';
	})

  }
	return(
		<div className="loginpage">
		<Header/>
			<div id="loginmainchunk">
				<h1 id="loginh1">Login</h1>
				<p id="loginaccess"> This will allow you to access your dashboard containing your saved future paths </p>
				<div id="loginform">
					<form onSubmit={handleSubmit}>

					<p className="formstuff">Username:</p>
					<input type="text" name="username" defaultValue="" onChange={handleChange}/> 

					<p className="formstuff">Password:</p>
					<input type="password" name="password" defaultValue="" id="bottominput" onChange={handleChange} /> 

					<input type="submit" id="submit" name="Submit"/>

					</form>

				</div>

				<p id="donthaveacct">Don't have an account? Sign up <a id="signuplink" href="/sign-up">here</a></p>
			</div>
		</div>

	);
}

export default Login;