import React from 'react';
import logo from './logo.svg';
import './CreateFuture.css';

import Header from "./header.js";

import TheForm from "./TheForm.js";

function CreateFuture() {
  return (
    <div className="App">
      <Header/>
      <h1 className="pageTitle">Create Your Future!</h1>
      <TheForm/>
    </div>
  );
}

export default CreateFuture;
