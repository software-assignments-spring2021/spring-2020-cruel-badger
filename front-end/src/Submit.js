import React from 'react';
import logo from './logo.svg';
import './TheForm.css';

function Submit(props) {
	return (
		<div>
			<a href={null} className="submitButton" onClick={props.handleSubmit}>Submit Results!</a>
		</div>
	);

}

export default Submit;
