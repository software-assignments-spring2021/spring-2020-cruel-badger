import React, {Component, useState, useEffect} from "react";
import './assets/css/dashboard.css'
import Header from "./header.js";
import axios from "axios";


//hard-coded data for testing purposes (will be changed)
// let formObjects = [{  name: "Go to Grad school", 
//                       state: "IL", 
//                       income: 1000,
//                       tax: 1000,
//                       inFlow: 1000,
//                       outFlow: 1000
//                     },
//                     {  name: "Take a vacation", 
//                       state: "IN", 
//                       income: 1000,
//                       tax: 1000,
//                       inFlow: 1000,
//                       outFlow: 1000
//                     },
//                     {  name: "Move back home", 
//                       state: "NV", 
//                       income: 1000,
//                       tax: 1000,
//                       inFlow: 1000,
//                       outFlow: 1000
//                     },
//                     {  name: "Accept that CS job", 
//                       state: "CA", 
//                       income: 1000,
//                       tax: 1000,
//                       inFlow: 1000,
//                       outFlow: 1000
//                     }
// ];



function renderCard(name, state, index) {
  return (
     <div className="card">
          <h3 className="title">{name}</h3>
          <button className="btn" ><i className="fa fa-trash"></i></button>
          <div className="bar">
          <div className="emptybar"></div>

              <p> {state} </p>

          <div className="filledbar"></div>
          </div>
          <a href={"/view-future/" + index}>
          <div className="circle">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle className="stroke" cx="60" cy="60" r="50"/>
            </svg>
          </div>
          </a>
        </div>
    )
}



// function processFutures() {
//   for (let i = 0; i < formObjects.length; i++) {
//     const card = renderCard();
//     return card;
//   }
// }


function Dashboard(props) {
  let [formObjects, setFormObjects] = useState([]); 
  useEffect(() => {
    axios.get("/futures-array").then(function(response) {
      setFormObjects(response.data);
    });
  });
  console.log(formObjects);


  // const [cardTitle, setCardTitle] = useState("");
	return (
		  <div className="App">
		  <Header/>
      <body> 
      <h2> DASHBOARD</h2>


      <div className="container">
          {formObjects.map((obj, index) => (renderCard(obj.name, obj.state, index)))}
      </div>


          <a className="button" href="/create-future"><span>Add Future</span></a>
          <h3>Select a card to view more details</h3>
        </body>
		  </div>

	);
}








export default Dashboard;