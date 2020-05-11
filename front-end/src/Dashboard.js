import React, {Component, useState, useEffect} from "react";
import './assets/css/dashboard.css'
import Header from "./header.js";
import axios from "axios";

function renderCard(name, state, moneyIn, moneyOut, index) {

// function renderCard(name, state) {

  function handleClick(e) {
    //e.preventDefault();
    console.log('deleted');
    //alert("Future has been deleted");
    axios({
      "method":"POST",
      "url":"http://localhost:4000/delete",
      "headers":{
      "content-type": "application/x-www-form-urlencoded"
    },  
      data: {
        name: name,
        futureState: state
      }
      })

  }

  let moneyDiff = moneyIn - moneyOut;
  //equal money flow in and out
  if (moneyDiff > -1000 && moneyDiff < 1000) {
      return (
       <div className="card" style={{backgroundColor: "#fcd200"}}>
            <h3 className="title">{name}</h3>
            <a href="/dashboard" onClick={handleClick} className="btn" style={{backgroundColor: "#fcd200"}}><i className="fa fa-trash"></i></a>
            <div className="bar">
            <div className="emptybar"></div>
                <p> Future State: </p>
                <p> {state} </p>

            <div className="filledbar"></div>
            </div>
            <a href={"/view-future/" + index}>
            <div className="circle">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fill: "#fcd200"}}>
                <circle className="stroke" cx="60" cy="60" r="50"/>
              </svg>
            </div>
            </a>
          </div>
      )
    } else if (moneyDiff <= -1000) {
      //negative money flow
      return (
       <div className="card">
            <h3 className="title">{name}</h3>
            <a href="/dashboard" onClick={handleClick} className="btn" ><i className="fa fa-trash"></i></a>
            <div className="bar">
            <div className="emptybar"></div>
                <p> Future State: </p>
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
    else {
      //positive money flow
      return (
       <div className="card" style={{backgroundColor: "green"}}>
            <h3 className="title">{name}</h3>
            <a href="/dashboard" onClick={handleClick} className="btn" style={{backgroundColor: "green"}}><i className="fa fa-trash"></i></a>
            <div className="bar">
            <div className="emptybar"></div>
                <p> Future State: </p>
                <p> {state} </p>

            <div className="filledbar"></div>
            </div>
            <a href={"/view-future/" + index}>
            <div className="circle">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fill: "green"}}>
                <circle className="stroke" cx="60" cy="60" r="50" />
              </svg>
            </div>
            </a>
          </div>
      )
    }
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
    //console.log(localStorage.email);
    axios.get("http://localhost:4000/dashboard", {headers: {Authorization: 'Bearer ' + localStorage.token}}).then(function(response) {
      setFormObjects(response.data);
    });
  }, []);
  console.log(formObjects);


  // const [cardTitle, setCardTitle] = useState("");
	return (
		  <div className="App">
		  <Header/>
      <body> 
      <h2> DASHBOARD</h2>


      <div className="container">
          {formObjects.map((obj, index) => (renderCard(obj.name, obj.futureStateAbbr, obj.moneyIn_tax, obj.adjustedMoneyOut_tax, index+1)))}
      </div>


          <a className="button" href="/create-future"><span>Add Future</span></a>
          <h3>Select a card to view more details</h3>
        </body>
		  </div>

	);
}








export default Dashboard;