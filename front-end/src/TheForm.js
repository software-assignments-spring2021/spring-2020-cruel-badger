import React from 'react';
import './TheForm.css';

import StepZilla from "react-stepzilla";
import Step1 from "./Step1.js";
import MoneyIn from "./MoneyIn.js"
import MoneyOut from "./MoneyOut.js"
import OtherExpenses from "./OtherExpenses.js"
import Submit from "./Submit.js"
import axios from "axios"

const TheForm = (props) => {
	let results = {};
	const handleChange = (event) => {
		//console.log(event.target.name + "=" + event.target.value);
		results[event.target.name] = event.target.value;
		//console.log(results);
	}

	const handleSubmit = (event) => {
		console.log("Handling Submit")
		console.log("Results are");
		console.log(results);

		//callAPI();
		//axios.post("http://localhost:4000/processFormData", {data:"hello"});
		axios({
	    "method":"POST",
	    "url":"http://localhost:4000/processFormData",
	    "headers":{
	    "content-type": "application/x-www-form-urlencoded"
		},	
	    data: results
    	}).then(response => {
    		console.log(response);
    	}).catch(error => {
    		console.log(error);
    	})

	}

	const callAPI = async () => {
		//console.log(results);
		let response = await axios.post("http://localhost:4000/processFormData", {data: results});
	}

	const steps = [
		{name: 'Intro', component: <Step1 handleChange={handleChange} results={results}/>},
		{name: 'Money In', component: <MoneyIn handleChange={handleChange} results={results}/>},
		{name: 'Money Out', component: <MoneyOut handleChange={handleChange} results={results}/>},
		{name: 'Other Expenses', component: <OtherExpenses handleChange={handleChange} results={results}/>},
		{name: 'Submit', component: <Submit handleSubmit={handleSubmit} results={results}/>}

	]

	return (

		<div className="wizard">
			<StepZilla  steps={steps} showSteps={false} stepsNavigation={true} nextButtonCls={"nextButtonClass"} backButtonCls={"backButtonClass"}/>
		</div>
	
	);





}

export default TheForm;