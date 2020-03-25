import React from 'react';
import './TheForm.css';

function MoneyIn(props) {
	return (
		<div>
			<h2 className="stepTitle"> Money In</h2>

			<h3>Enter your Salary</h3>
			$<input type="text" name="salary" defaultValue={props.results.salary} onChange={props.handleChange}/> <br/>
			Monthly:<input type="radio" name="salaryType" defaultChecked={props.results.salaryType === "monthly" ? true : false} value="monthly" onChange={props.handleChange}/>
			Yearly:<input type="radio" name="salaryType" defaultChecked={props.results.salaryType === "yearly" ? true : false} value="yearly" onChange={props.handleChange}/>

			<br/>
			<br/>

			<h3>Enter any other Income you have</h3>
			$<input type="text" name="otherIncome" defaultValue={props.results.otherIncome} onChange={props.handleChange}/> <br/>
			Monthly:<input type="radio" name="otherIncomeType" defaultChecked={props.results.otherIncomeType === "monthly" ? true : false} value="monthly" onChange={props.handleChange}/>
			Yearly:<input type="radio" name="otherIncomeType" defaultChecked={props.results.otherIncomeType === "yearly" ? true : false} value="yearly" onChange={props.handleChange}/>

			<br/>
			<br/>
		</div>
	);

}

export default MoneyIn;