import React from 'react';
import './TheForm.css';

const OtherExpenses = (props) => {
	return (
		<div>
			<h2 className="stepTitle">Other Expenses</h2>


			<h3 className="questionTitle">Enter your desired savings per month</h3>
			<h4 className="qExplain">How much money you want to put away into investments, savings accounts, etc</h4>

			From $<input type="text" name="savingsLow" onChange={props.handleChange} defaultValue={props.results.savingsLow}/> To $<input type="text" name="savingsHigh" onChange={props.handleChange} defaultValue={props.results.savingsHigh}/> <br/>
			Daily:<input type="radio" name="savingsType" defaultChecked={props.results.savingsType === "daily" ? true : false} onChange={props.handleChange} value="daily" />
			Weekly:<input type="radio" name="savingsType" defaultChecked={props.results.savingsType === "weekly" ? true : false} onChange={props.handleChange} value="weekly" />
			Monthly:<input type="radio" name="savingsType" defaultChecked={props.results.savingsType === "monthly" ? true : false} onChange={props.handleChange} value="monthly" />

			<br/>
			<br/>

			<h3>Enter your estimated leisure costs</h3>
			<h4 className="qExplain">This would be money spent on going out; drinks, movies, museums, etc</h4>

			From $<input type="text" name="leisureLow" onChange={props.handleChange} defaultValue={props.results.leisureLow}/> To $<input type="text" name="leisureHigh" onChange={props.handleChange} defaultValue={props.results.leisureHigh}/> <br/>
			Daily:<input type="radio" name="leisureType" defaultChecked={props.results.leisureType === "daily" ? true : false} onChange={props.handleChange} value="daily" />
			Weekly:<input type="radio" name="leisureType" defaultChecked={props.results.leisureType === "weekly" ? true : false} onChange={props.handleChange} value="weekly" />

			<br/>
			<br/>

			<h3>Enter any other expenses you could have</h3>
			<h4 className="qExplain">Consider vacations, donations, etc</h4>
			From $<input type="text" name="otherLow" onChange={props.handleChange} defaultValue={props.results.otherLow}/> To $<input type="text" name="otherHigh" onChange={props.handleChange} defaultValue={props.results.otherHigh}/> <br/>
			Weekly:<input type="radio" name="otherType" defaultChecked={props.results.otherType === "weekly" ? true : false} onChange={props.handleChange} value="weekly" />
			Monthly:<input type="radio" name="otherType" defaultChecked={props.results.otherType === "monthly" ? true : false} onChange={props.handleChange} value="monthly" />

			<br/>
			<br/>

			<h3>Enter your current amount of debt</h3>
			$<input type="text" name="debt" onChange={props.handleChange} defaultValue={props.results.debt}/>
			<br/>
			<br/>
		</div>


	);



}


export default OtherExpenses;