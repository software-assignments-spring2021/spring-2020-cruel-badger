import React, { useState, useEffect } from 'react';
import './Future.css';
import Header from './header.js';
import Chart from "react-google-charts";
import Popup from "reactjs-popup";
import axios from "axios";

const FutureOverview = ( props ) => {
  return (
    <futureOverViewBox>
      <h1 className="overViewH1"> {props.heading} </h1>
      <p className="overViewP"> {props.paragraph} </p>
    </futureOverViewBox>
  )
}

// const FutureDiagram = ( props ) => {
//   return (
//     <futureDiagramBox>
//       /*<h1 className="overViewH1">{props.title}</h1>
//       <p className="overViewP">{props.text}</p>*/
//     </futureDiagramBox>
//   )
// }

const FutureSummary = ( props ) => {
  return (
    <futureSummaryBox>
      <h1 className="summaryH1"> {props.heading} </h1>
        <p className="summaryP">{props.paragraph} </p>
    </futureSummaryBox>
  )
}


const Future = () => {
    let [pieData, setPieData] = useState([]);
    let [barData, setBarData] = useState([]);
    useEffect(() => {
      axios.get("/futureDataTest").then(function(response) {
        setPieData(response.data.pieChart);
        setBarData(response.data.barChart);
      });
    });
    return (
      <>
        <Header/>
        <futureOverall>
          <FutureOverview heading="Your Future Looks Great!" />
        </futureOverall>
        <futureGraph>
          <futureDiagramBox>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pieData}
                options={{
                  chartArea: {left: '5%', right: '5%',},
                  //backgroundColor: 'red',
                  title: 'Overall Expenses',
                  // Just add this option
                  is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            </futureDiagramBox>
            <futureDiagramBox>
              <Chart
                width={'600px'}
                height={'300px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={barData}
                options={{
                  chartArea: {left: '10%', right: '12%',},
                  chart: {title: 'Income In vs. Out'},
                  vAxis: { title: 'Money', },
                  hAxis: { title: 'Month' ,},
                  //backgroundColor: 'yellow',
                }}
                // For tests
                rootProps={{ 'data-testid': '3' }}
              />
          </futureDiagramBox>
        </futureGraph>
        <futureSummary>
          <FutureSummary heading="Recommendations" paragraph="lorem ipsum recommendation" />
        </futureSummary>
        <futureSummary>
          <FutureSummary heading="Outlook on Debt" paragraph="lorem ipsum debt" />
        </futureSummary>
        <futureSummary>
          <Popup trigger={<button className="future-button"> Save Future </button>} modal>
            {close => (
              <div className="future-modal-button">
                <a className="future-close" onClick={close}>
                  &times;
                </a>

                <div className="button-actions">
                  <button className="future-save-button" onClick={() => {
                      console.log("modal closed ");
                      close();
                      window.location.href="/sign-up";
                    }}>
                    Sign in to Save Your Future
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </futureSummary>
      </>
    )
}

export default Future;
