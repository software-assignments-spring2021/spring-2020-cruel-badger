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


function Login() {
	return(
		<div className="loginpage">
		<Header/>
			<div id="loginmainchunk">
				<h1 id="loginh1">Login</h1>
				<p id="loginaccess"> This will allow you to access your dashboard containing your saved future paths </p>
				<div id="loginform">
					<Form
		      			onSubmit={values => {
		        		console.log('formValues', values)
		      			}}
	    			>
						<TextBox
							id="username"
		       				name="username"
		        			label="Username"
		        			initialValue=""
		      			/>

		      			<Password
					        name="password"
					        label="Password"
					        initialValue=""
		      			/>
		      			<Button id="loginsubmit" href="/dashboard"><a id="logininside" href="/dashboard">Submit</a></Button>
		      			
		      			
		      		</Form>
				</div>

				<p id="donthaveacct">Don't have an account? Sign up <a id="signuplink" href="/sign-up">here</a></p>
			</div>
		</div>

	);
}

export default Login;