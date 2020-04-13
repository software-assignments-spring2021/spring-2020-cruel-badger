import React from 'react';
import './TheForm.css';

import {Link} from "react-router-dom";


function Submit(props) {
	return (
		<div>
			<h2 className="stepTitle">Submit</h2>
			<button href="" className="submitButton" onClick={props.handleSubmit}>Submit Results!</button>
		</div>
	);

}

export default Submit;
