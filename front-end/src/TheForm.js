import React from 'react';
import logo from './logo.svg';
import './TheForm.css';

import StepZilla from "react-stepzilla";
import Step1 from "./Step1.js";
import MoneyIn from "./MoneyIn.js"
import MoneyOut from "./MoneyOut.js"
import OtherExpenses from "./OtherExpenses.js"
import Submit from "./Submit.js"

const TheForm = () => {
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
			<StepZilla  steps={steps} showSteps={false} stepsNavigation={true}/>
		</div>
	
	);





}

export default TheForm;