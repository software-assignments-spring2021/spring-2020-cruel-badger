import React from 'react';
import './TheForm.css';

function Submit(props) {
	return (
		<div>
			<h2 className="stepTitle">Submit</h2>
			<a href="view-future" className="submitButton" onClick={props.handleSubmit}>Submit Results!</a>
		</div>
	);

}

export default Submit;
