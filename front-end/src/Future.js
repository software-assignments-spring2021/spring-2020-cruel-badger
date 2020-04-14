import React, { useState, useEffect } from 'react';
import './Future.css';
import Header from './header.js';
import Chart from "react-google-charts";
import Popup from "reactjs-popup";
import axios from "axios";
import { useParams } from "react-router";

const FutureOverview = ( props ) => {
  if(props.status == -1) {
    return (
      <futureOverViewBoxBad>
        <h1 className="overViewH1">"This Plan Doesn't Look Good!"</h1>
      </futureOverViewBoxBad>
    )
  } else if (props.status == 0) {
    return (
      <futureOverViewBoxNeutral>
        <h1 className="overViewH1">"This Plan Could Be Better, But Not Bad!"</h1>
      </futureOverViewBoxNeutral>
    )
  } else {
    return (
      <futureOverViewBoxGood>
        <h1 className="overViewH1">Great Job! This is a Great Plan!</h1>
      </futureOverViewBoxGood>
    )
  }
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
  if (props.heading === "rec") {
    //if positive cashflow
    if (props.status == 1) {
      //if positive cash flow but future state is more expensive
      if (props.stateDiff[2] > 5) {
        return (
          <futureSummaryBox>
            <h1 className="summaryH1">Recommendations:</h1>
              <p className="summaryP">{"This plan is looking pretty good! You have a positive cash flow, however you should watch out for the higher costs in " + props.stateDiff[0] + "."}</p> 
              <p className="summaryP">{props.stateDiff[0] + " is " + props.stateDiff[2] + "% more expensive to live in compared to " + props.stateDiff[1] + "."}</p>
          </futureSummaryBox>
        )
      } else if (props.stateDiff[2] < -5) {
        return (
          <futureSummaryBox>
            <h1 className="summaryH1">Recommendations:</h1>
              <p className="summaryP">{"This plan is looking pretty good! You have a positive cash flow, and " + props.stateDiff[0] + " is cheaper to live in!."}</p> 
              <p className="summaryP">{props.stateDiff[0] + " is " + (-1 * props.stateDiff[2]) + "% cheaper to live in compared to " + props.stateDiff[1] + "."}</p>
          </futureSummaryBox>
        )
      } else if (props.status == 0) {
        //if neutral cash flow but future state is more expensive
        if (props.stateDiff[2] > 5) {
          return (
            <futureSummaryBox>
              <h1 className="summaryH1">Recommendations:</h1>
                <p className="summaryP">{"This plan is okay. Your cash flow is close to 0, so you should watch out for the higher costs in " + props.stateDiff[0] + "."}</p> 
                <p className="summaryP">{props.stateDiff[0] + " is " + props.stateDiff[2] + "% more expensive to live in compared to " + props.stateDiff[1] + "."}</p>
            </futureSummaryBox>
          )
        } else if (props.stateDiff[2] < -5) {
          return (
            <futureSummaryBox>
              <h1 className="summaryH1">Recommendations:</h1>
                <p className="summaryP">{"This plan is okay. Your cash flow is close to 0, however because " + props.stateDiff[0] + " is cheaper to live in, your costs will be lower."}</p> 
                <p className="summaryP">{props.stateDiff[0] + " is " + (-1 * props.stateDiff[2]) + "% cheaper to live in compared to " + props.stateDiff[1] + "."}</p>
            </futureSummaryBox>
          )
        }
    } else {
      //if negative cash flow but future state is more expensive
      if (props.stateDiff[2] > 5) {
        return (
          <futureSummaryBox>
            <h1 className="summaryH1">Recommendations:</h1>
              <p className="summaryP">{"Your plan needs work. Your cash flow is already negative, so you should watch out for the higher costs in " + props.stateDiff[0] + "."}</p> 
              <p className="summaryP">{props.stateDiff[0] + " is " + props.stateDiff[2] + "% more expensive to live in compared to " + props.stateDiff[1] + "."}</p>
          </futureSummaryBox>
        )
      } else if (props.stateDiff[2] < -5) {
        return (
          <futureSummaryBox>
            <h1 className="summaryH1">Recommendations:</h1>
              <p className="summaryP">{"Your plan needs work. Your cash flow is negative, however because " + props.stateDiff[0] + " is cheaper to live in, your costs will be lower."}</p> 
              <p className="summaryP">{props.stateDiff[0] + " is " + (-1 * props.stateDiff[2]) + "% cheaper to live in compared to " + props.stateDiff[1] + "."}</p>
          </futureSummaryBox>
        )
      }
    }
  }
  if (props.heading === "outlook") {
    if (props.status == 1) {
      return (
          <futureSummaryBox>
            <h1 className="summaryH1">Outlook:</h1>
              <p className="summaryP">{"The outlook on this plan is good! You have a positive cash flow, however you should watch out for the higher costs in " + props.stateDiff[0] + "."}</p> 
          </futureSummaryBox>
        )
      } else if (props.status == 0) {
        return (
          <futureSummaryBox>
            <h1 className="summaryH1">Outlook:</h1>
              <p className="summaryP">{"The outlook on this plan could be better. You have a positive cash flow, however you should watch out for the higher costs in " + props.stateDiff[0] + "."}</p> 
          </futureSummaryBox>
        )
    } else {
      return (
          <futureSummaryBox>
            <h1 className="summaryH1">Outlook:</h1>
              <p className="summaryP">{"The outlook on this plan does not look great. You have a positive cash flow, however you should watch out for the higher costs in " + props.stateDiff[0] + "."}</p> 
          </futureSummaryBox>
      )
    }
  }
}


const Future = (props) => {
  let futureID = useParams();
    let [pieData, setPieData] = useState([]);
    let [barData, setBarData] = useState([]);
    let [cashFlow, setCashFlow] = useState(0);
    let [financialIndicator, setFinancialIndicator] = useState(0);
    let [stateCost, setStateCost] = useState([]);
    useEffect(() => {
      axios.get("/futureArrayTest", {params: {id: futureID}}).then(function(response) {
        console.log(response.data);
        setPieData(response.data.pieChart);
        setBarData(response.data.barChart);
        setCashFlow(response.data.cashFlow);
        setFinancialIndicator(response.data.financialIndicator);
        setStateCost(response.data.stateCost);
      });
    }, []);
    return (
      <>
        <Header/>
        <futureOverall>
          <FutureOverview status={financialIndicator}/>
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
                  //hAxis: { title: 'Cash Flow' ,},
                  //backgroundColor: 'yellow',
                }}
                // For tests
                rootProps={{ 'data-testid': '3' }}
              />
          </futureDiagramBox>
        </futureGraph>
        <futureSummary>
          <FutureSummary heading="rec" status={financialIndicator} stateDiff={stateCost} />
        </futureSummary>
        <futureSummary>
          <FutureSummary heading="outlook" status={financialIndicator} cashFlows={cashFlow}/>
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
