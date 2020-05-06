import React from 'react';
import './TheForm.css';

import {Link} from "react-router-dom";


function Submit(props) {
	return (
		<div>
			<h2 className="stepTitle">Submit</h2>
			<button href="" className="submitButton" onClick={props.handleSubmit}>Submit Results!</button>
			<p>If submission doesn't work, it means there is some type of issue with your input</p>
			<p>Go check your entries to make sure nothing is missing and everything is filled properly</p>
		</div>
	);

}

export default Submit;
