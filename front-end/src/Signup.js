import ReactDOM from 'react-dom';
import React, {Component}from 'react';
import Header from "./header.js";


import './Signup.css';
import {
    Button,
    Form,
    EmailInput,
    Password
  } from 'react-form-elements';


function Signup() {
	return(
		<div className="signuppage">
		<Header/>
			<div id="signupmainchunk">
				<h1 id="signuph1">Sign Up</h1>
				<p id="signupaccess"> This will allow you to save future paths so you can access them again </p>
				<div id="signupform">
					<Form
		      			onSubmit={values => {
		        		console.log('formValues', values)
		      			}}
	    			>
						<EmailInput
							id="emailAddress"
		       				name="emailAddress"
		        			label="Email Address"
		        			initialValue=""
		      			/>

		      			<Password
					        name="password"
					        label="Password"
					        initialValue=""
		      			/>

		      			<Password
					        name="passwordconfirm"
					        label="Confirm Password"
					        initialValue=""
		      			/>
		      			<Button id="signupsubmit" href="/dashboard"><a id="signupinside" href="/dashboard">Submit</a></Button>
		      			
		      			
		      		</Form>
				</div>

				<p id="haveacct">Have an account already? Login <a id="loginlink" href="/log-in">here</a></p>
			</div>
		</div>

	);
}

export default Signup;