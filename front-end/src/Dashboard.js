import React, {Component, useState} from "react";
import './assets/css/dashboard.css'
import Header from "./header.js";


//hard-coded data for testing purposes (will be changed)
let formObjects = [{  name: "Go to Grad school", 
                      state: "IL", 
                      income: 1000,
                      tax: 1000,
                      inFlow: 1000,
                      outFlow: 1000
                    },
                    {  name: "Take a vacation", 
                      state: "IN", 
                      income: 1000,
                      tax: 1000,
                      inFlow: 1000,
                      outFlow: 1000
                    },
                    {  name: "Move back home", 
                      state: "NV", 
                      income: 1000,
                      tax: 1000,
                      inFlow: 1000,
                      outFlow: 1000
                    },
                    {  name: "Accept that CS job", 
                      state: "CA", 
                      income: 1000,
                      tax: 1000,
                      inFlow: 1000,
                      outFlow: 1000
                    }
];




function renderCard(name, state) {
  return (
     <div class="card">
          <h3 class="title">{name}</h3>
          <button class="btn"><i class="fa fa-trash"></i></button>
          <div class="bar">
          <div class="emptybar"></div>

              <p> {state} </p>

          <div class="filledbar"></div>
          </div>
          <a href="/view-future">
          <div class="circle">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle class="stroke" cx="60" cy="60" r="50"/>
            </svg>
          </div>
          </a>
        </div>
    )
}



function processFutures() {
  for (let i = 0; i < formObjects.length; i++) {
    const card = renderCard();
    return card;
  }
}


function Dashboard(props) {
  // const [cardTitle, setCardTitle] = useState("");
	return (
		  <div className="App">
		  <Header/>
      <body> 
      <h2> DASHBOARD</h2>


      <div class="container">
          {formObjects.map(obj => (renderCard(obj.name, obj.state)))}
      </div>


          <a class="button" href="/create-future"><span>Add Future</span></a>
          <h3>Select a card to view more details</h3>
        </body>
		  </div>

	);
}






export default Dashboard;