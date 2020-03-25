import React from 'react';
import './TheForm.css';

function Submit(props) {
	return (
		<div>
			<a href="view-future" className="submitButton" onClick={props.handleSubmit}>Submit Results!</a>
		</div>
	);

}

export default Submit;
