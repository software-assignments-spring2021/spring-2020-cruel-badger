import React from 'react';

import './CreateFuture.css';

import Header from "./header.js";

import TheForm from "./TheForm.js";

function CreateFuture(props) {
  return (
    <div className="App">
      <Header/>
      <h1 className="pageTitle">Create Your Future!</h1>
      <TheForm/>
    </div>
  );
}

export default CreateFuture;
