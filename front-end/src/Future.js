import React from 'react';
import './Future.css';
import Header from './header.js';
import Chart from "react-google-charts";

const Overview = ( props ) => {
  return (
    <overViewBox>
      <h1 className="overViewH1"> {props.heading} </h1>
      <p> {props.paragraph} </p>
    </overViewBox>
  )
}

const Diagram = ( props ) => {
  return (
    <diagramBox>
      /*<h1>{props.title}</h1>
      <p>{props.text}</p>*/
    </diagramBox>
  )
}

const Summary = ( props ) => {
  return (
    <summaryBox>
      <h1 className="summaryH1"> {props.heading} </h1>
        <p className="summaryP">{props.paragraph} </p>
    </summaryBox>
  )
}


const Future = () => {
    return (
      <>
        <Header/>
        <overall>
          <Overview heading="Your Future Looks Great!" />
        </overall>
        <graph>
          <diagramBox>
            <Chart
              width={'60%'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Expense', 'Dollars'],
                ['Food', 2000],
                ['Rent', 4000],
                ['Commute', 2500],
                ['Entertainment', 1500],
                ['Utilities', 350],
              ]}
              options={{
                chartArea: {left: '5%', right: '5%',},
                //backgroundColor: 'red',
                title: 'Overall Expenses',
                // Just add this option
                is3D: true,
              }}
              rootProps={{ 'data-testid': '2' }}
            />
            <Chart
              width={'100%'}
              height={'300px'}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'In', 'Out'],
                ['Jan', 10000, 8000],
                ['Feb', 10000, 4000],
                ['Mar', 10000, 11000],
                ['Apr', 10000, 3000],
                ['May', 10000, 5000],
                ['June', 10000, 8000],
                ['July', 10000, 4650],
                ['Aug', 10000, 6000],
                ['Sept', 10000, 3470],
                ['Oct', 10000, 2340],
                ['Nov', 10000, 5232],
                ['Dec', 10000, 7234],
              ]}
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
          </diagramBox>
        </graph>
        <summary>
          <Summary heading="Recommendations" paragraph="lorem ipsum recommendation blah" />
        </summary>
        <summary>
          <Summary heading="Outlook on Debt" paragraph="lorem ipsum debt blah" />
        </summary>
      </>
    )
}

export default Future;
