import React from 'react';
import './TheForm.css';

function MoneyOut(props) {
	return (
		<div>
			<h2>Money Out</h2>

			<h3>Enter your estimated housing expenses</h3>
			<h4>This would be how much you expect to pay monthly for rent/mortgage</h4>

			From $<input type="text" name="housingLow" onChange={props.handleChange} defaultValue={props.results.housingLow}/> To $<input type="text" name="housingHigh" onChange={props.handleChange} defaultValue={props.results.housingHigh}/>

			<br/>
			<br/>
			<h3>Enter your estimated food expenses</h3>
			<h4>Base this on your current dining habits</h4>

			From $<input type="text" name="foodLow" onChange={props.handleChange} defaultValue={props.results.foodLow}/> To $<input type="text" name="foodHigh" onChange={props.handleChange} defaultValue={props.results.foodHigh}/> <br/>
			Daily:<input type="radio" name="foodType" defaultChecked={props.results.foodType === "daily" ? true : false} onChange={props.handleChange} value="daily" />
			Weekly:<input type="radio" name="foodType" defaultChecked={props.results.foodType === "weekly" ? true : false} onChange={props.handleChange} value="weekly" />

			<br/>
			<br/>
			<h3>Enter your estimated transportation costs</h3>
			<h4>This would be how much you spend on your metrocard, or gas and car payments</h4>
			From $<input type="text" name="transportLow" onChange={props.handleChange} defaultValue={props.results.transportLow}/> To $<input type="text" name="transportHigh" onChange={props.handleChange} defaultValue={props.results.transportHigh}/> <br/>
			Daily:<input type="radio" name="transportType" defaultChecked={props.results.transportType === "daily" ? true : false} onChange={props.handleChange} value="daily" />
			Weekly:<input type="radio" name="transportType" defaultChecked={props.results.transportType === "weekly" ? true : false} onChange={props.handleChange} value="weekly" />
			Monthly:<input type="radio" name="transportType" defaultChecked={props.results.transportType === "monthly" ? true : false} onChange={props.handleChange} value="monthly" />

			<br/>
			<br/>
		</div>

	);


}

export default MoneyOut;