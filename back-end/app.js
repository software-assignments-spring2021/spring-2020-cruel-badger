const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT;
require('./db.js')

const app = express();

let plans = []




let futureArray = [{

		      		name: "Work in WI",
		      		currentStateAbbr: "NY",
		      		futureStateAbbr: "WI",
		      		currentStateLong: "New York",
		      		futureStateLong: "Wisconsin",
		      		currentStateData: {
		            "State": "New York",
		            "costIndex": "139.1000",
		            "costRank": 48,
		            "groceryCost": "114.8000",
		            "housingCost": "204.4000",
		            "utilitiesCost": "108.7000",
		            "transportationCost": "116.6000",
		            "miscCost": "104.8000"
		        },
		      		futureStateData: {
		            "State": "Wisconsin",
		            "costIndex": "97.3000",
		            "costRank": 25,
		            "groceryCost": "100.7000",
		            "housingCost": "91.4000",
		            "utilitiesCost": "98.9000",
		            "transportationCost": "98.1000",
		            "miscCost": "115.2000"
		        },
		      		yearlyIncome: 105000,
		      		yearlyOtherIncome: 12000,
		      		moneyIn: 117000,
		      		moneyIn_tax: 87040.48,
		      		yearlyHousing: 21000,
		      		yearlyFood: 9125,
		      		yearlyTransport: 2100,
		      		yearlySavings: 12000,
		      		yearlyLeisure: 9100,
		      		yearlyOther: 4200,
		      		moneyOut: 87484.52,
		      		moneyOut_tax: 57525,
		      		adjustedFood: 8004.26,
		      		adjustedHousing: 9390.41,
		      		adjustedTransport: 1766.81,
		      		adjustedLeisure: 6365.42,
		      		adjustedOther: 2937.89,
		      		adjustedMoneyOut: 70424.29,
		      		adjustedMoneyOut_tax: 40464.77

		      	},
                    {

		      		name: "Chill in HI",
		      		currentStateAbbr: "NY",
		      		futureStateAbbr: "HI",
		      		currentStateLong: "New York",
		      		futureStateLong: "Hawaii",
		      		currentStateData: {
		            "State": "New York",
		            "costIndex": "139.1000",
		            "costRank": 48,
		            "groceryCost": "114.8000",
		            "housingCost": "204.4000",
		            "utilitiesCost": "108.7000",
		            "transportationCost": "116.6000",
		            "miscCost": "104.8000"
		        },
		      		futureStateData: {
		            "State": "Hawaii",
		            "costIndex": "192.9000",
		            "costRank": 51,
		            "groceryCost": "169.3000",
		            "housingCost": "318.6000",
		            "utilitiesCost": "172.7000",
		            "transportationCost": "148.6000",
		            "miscCost": "116.8000"
		        },
		      		yearlyIncome: 20000,
		      		yearlyOtherIncome: 12000,
		      		moneyIn: 123456,
		      		moneyIn_tax: 123456,
		      		yearlyHousing: 12,
		      		yearlyFood: 23,
		      		yearlyTransport: 36,
		      		yearlySavings: 34,
		      		yearlyLeisure: 7654,
		      		yearlyOther: 53454,
		      		moneyOut: 346.52,
		      		moneyOut_tax: 642,
		      		adjustedFood: 543.26,
		      		adjustedHousing: 65432.41,
		      		adjustedTransport: 346.81,
		      		adjustedLeisure: 6234.42,
		      		adjustedOther: 634.89,
		      		adjustedMoneyOut: 632.29,
		      		adjustedMoneyOut_tax: 3246.77

		      	}
];


let cost_json = JSON.parse(fs.readFileSync("cost_data.json"));
let cost_data = cost_json.data
//console.log(cost_data);



app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
	res.send("This is the backend");
})

// app.get("/dashboard", (req, res) => {
// 	res.json(plans)
// })

let abbrToState = (abbr) => {
	var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    for (let i = 0; i < states.length; i++) {
    	if (abbr === states[i][1]) return states[i][0];
    }
    return "Invalid state abbr"
    
}


//route to recieve and process front end results
app.post("/processFormData", (req, res) => {
	console.log("In the backend");
	console.log(req.body);

	console.log(Object.keys(req.body));
	console.log(JSON.parse(Object.keys(req.body)[0]))

	//let formData = req.body.data
	let formData = JSON.parse(Object.keys(req.body)[0]);
	console.log("form data is");
	console.log(formData)

	let aveHousing = (parseFloat(formData.housingLow) + parseFloat(formData.housingHigh)) / 2;
	let yearlyHousing = aveHousing * 12;
	console.log(`Yearly housing costs: ${yearlyHousing}`)


	let aveFood = (parseFloat(formData.foodLow) + parseFloat(formData.foodHigh)) / 2;
	let yearlyFood = 0;
	if (formData.foodType === "daily") {
		yearlyFood = aveFood * 365;
	}
	else if (formData.foodType === "weekly") {
		yearlyFood = aveFood * 52
	} else if (formData.foodType === "monthly") {
		yearlyFood = aveFood * 12;
	}

	console.log(`Yearly food costs: ${yearlyFood}`)

	let aveTransport = (parseFloat(formData.transportLow) + parseFloat(formData.transportHigh)) / 2; 
	let yearlyTransport = 0;
	if (formData.transportType === "daily") {
		yearlyTransport = aveTransport * 365;
	}
	else if (formData.transportType === "weekly") {
		yearlyTransport = aveTransport * 52;
	}
	else if (formData.transportType === "monthly") {
		yearlyTransport = aveTransport * 12;
	}

	console.log(`Yearly transport costs: ${yearlyTransport}`)

	let aveSavings = (parseFloat(formData.savingsLow) + parseFloat(formData.savingsHigh)) / 2;
	let yearlySavings = 0;
	if (formData.savingsType === "daily") {
		yearlySavings = aveSavings * 365
	}
	else if (formData.savingsType === "weekly") {
		yearlySavings = aveSavings * 52
	}
	else if (formData.savingsType === "monthly") {
		yearlySavings = aveSavings * 12
	}

	console.log(`Yearly savings costs: ${yearlySavings}`)

	let aveLeisure = (parseFloat(formData.leisureLow) + parseFloat(formData.leisureHigh)) / 2;
	let yearlyLeisure = 0;
	if (formData.leisureType === "daily") {
		yearlyLeisure = aveLeisure * 365;
	}
	else if (formData.leisureType === "weekly") {
		yearlyLeisure = aveLeisure * 52;
	}
	else if (formData.leisureType === "monthly") {
		yearlyLeisure = aveLeisure * 12;
	}

	console.log(`Yearly leisure costs: ${yearlyLeisure}`)


	let aveOther = (parseFloat(formData.otherLow) + parseFloat(formData.otherHigh)) / 2;
	let yearlyOther = 0;
	if (formData.otherType === "daily") {
		yearlyOther = aveOther * 365
	}
	else if (formData.otherType === "weekly") {
		yearlyOther = aveOther * 52
	}
	else if (formData.otherType === "monthly") {
		yearlyOther = aveOther * 12
	}

	console.log(`Yearly other costs: ${yearlyOther}`)

	let yearlyDebt = parseFloat(formData.debt);

	console.log(`Yearly debt costs: ${yearlyDebt}`)

	let yearlyOtherIncome = 0;
	if (formData.otherIncomeType === "monthly") {
		yearlyOtherIncome = parseFloat(formData.otherIncome) * 12
	}
	else if (formData.otherIncomeType === "yearly") {
		yearlyOtherIncome = parseFloat(formData.otherIncome);
	}

	console.log(`Yearly other income: ${yearlyOtherIncome}`)




	let yearlyIncome = 0;
	if (formData.salaryType === "yearly") {
		yearlyIncome = parseFloat(formData.salary)
	}
	else if (formData.salaryType === "monthly") {
		yearlyIncome = parseFloat(formData.salary) * 12
	}
	//now yearly income is correct
	//now to check how much they would pay in taxes
	console.log(`Yearly income: ${yearlyIncome}`)


	

	axios({
	    "method":"POST",
	    "url":"https://taxee.io/api/v2/calculate/2020",
	    "headers":{
	    "content-type":"application/json",
	    "authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVlOGUyODMzZjEyNWY2MTQ3MmMyM2EyOSIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU4NjM3NDcwN30.ULT5iDPIVHdGBVCqRDNSQaNJjrDRW1dLQO1gwNaFy1U"
	    },"data":{
	    "state":formData.futureState,
	    "filing_status":"single",
	    "pay_rate":yearlyIncome
	    }
    })
    .then((response)=> {
      console.log(`Future name is  ${formData.planName}`)
      console.log(`State is ${formData.futureState}`)
      console.log(`Income is ${yearlyIncome}`)
      //console.log(response.data)

      let totalTax = response.data.annual.fica.amount + response.data.annual.federal.amount + response.data.annual.state.amount;
      console.log(`Total tax is ${totalTax}`)

      
      let moneyIn = yearlyIncome + yearlyOtherIncome;

      let moneyOut = yearlyHousing + yearlyFood + yearlyTransport + yearlySavings + yearlyLeisure + yearlyOther + totalTax + yearlyDebt;

      console.log(`MONEY COMING IN PER YEAR: ${moneyIn}`)
      console.log(`MONEY GOING OUT PER YEAR: ${moneyOut}`)


      
     


      	let currentState = abbrToState(formData.currentState);
      	let currentCostData = {}

      	let futureState = abbrToState(formData.futureState);
		let futureCostData = {}

      	for (let i = 0; i < cost_data.length; i++) {
      		if (cost_data[i].State === currentState) {
      			currentCostData = cost_data[i];
      		}
      		if (cost_data[i].State === futureState) {
      			futureCostData = cost_data[i];
      		}
      	}

      	let costAdjustment = ((futureCostData.costIndex / currentCostData.costIndex));
      	let foodAdjustment = ((futureCostData.groceryCost / currentCostData.groceryCost));
      	let transportAdjustment = ((futureCostData.transportationCost / currentCostData.transportationCost));
      	let housingAdjustment = ((futureCostData.housingCost / currentCostData.housingCost));

      	let adjustedFood = yearlyFood * foodAdjustment;
      	let adjustedHousing = yearlyHousing * housingAdjustment;
      	let adjustedTransport = yearlyTransport * transportAdjustment;
      	let adjustedLeisure = yearlyLeisure * costAdjustment;
      	let adjustedOther = yearlyOther * costAdjustment;

      	console.log("Adjusted cost of food: " + adjustedFood)
      	console.log("Adjusted cost of housing: " + adjustedHousing)
      	console.log("Adjusted cost of transport: " + adjustedTransport)
      	console.log("Adjusted cost of leisure: " + adjustedLeisure)
      	console.log("Adjusted cost of other: " + adjustedOther)

      	let adjustedMoneyOut = adjustedHousing + adjustedFood + adjustedTransport + yearlySavings + adjustedLeisure + adjustedOther + totalTax + yearlyDebt;

      	let obj = {

      		name: formData.name,
      		currentStateAbbr: formData.currentState,
      		futureStateAbbr: formData.futureState,
      		currentStateLong: currentState,
      		futureStateLong: futureState,
      		currentStateData: currentCostData,
      		futureStateData: futureCostData,
      		yearlyIncome: yearlyIncome,
      		yearlyOtherIncome: yearlyOtherIncome,
      		moneyIn: moneyIn,
      		moneyIn_tax: moneyIn - totalTax,
      		yearlyHousing: yearlyHousing,
      		yearlyFood: yearlyFood,
      		yearlyTransport: yearlyTransport,
      		yearlySavings: yearlySavings,
      		yearlyLeisure: yearlyLeisure,
      		yearlyOther: yearlyOther,
      		moneyOut: moneyOut,
      		moneyOut_tax: moneyOut - totalTax,
      		adjustedFood: adjustedFood,
      		adjustedHousing: adjustedHousing,
      		adjustedTransport: adjustedTransport,
      		adjustedLeisure: adjustedLeisure,
      		adjustedOther: adjustedOther,
      		adjustedMoneyOut: adjustedMoneyOut,
      		adjustedMoneyOut_tax: adjustedMoneyOut - totalTax
      	}

      	futureArray.push(obj);
      	let id = futureArray.length-1;
      	res.json({future: obj, futureID: id});

    })
    .catch((error)=>{
      console.log(error)
    })
})

//get function to get array of futures
app.get('/futures-array', (req, res) => {
    res.send(futureArray);
});

app.get('/futureArrayTest', (req, res) => {
	let index = JSON.parse(req.query.id);
	console.log(index.id);
	let future = futureArray[index.id];
	//console.log(((future.futureStateData.costIndex - future.currentStateData.costIndex) / future.currentStateData.costIndex * 100).toFixed(2));

	//get money in vs money out flow
	let moneyFlow = future.moneyIn_tax - future.adjustedMoneyOut_tax;

	//financial status determines between -1, 0, 1 how well the plan will do
	let financialStatus = 0;
	if (moneyFlow > -500 && moneyFlow < 500) {
		financialStatus = 0;
	} else if (moneyFlow <= -500) {
		financialStatus = -1;
	}
	else {
		financialStatus = 1;
	}

	//get the difference of the cost index between states
	let costDiff = ((future.futureStateData.costIndex - future.currentStateData.costIndex) / future.currentStateData.costIndex * 100.000).toFixed(2);
	//console.log(costDiff);
	//get max expense
	// let expenses = [['Food', future.adjustedFood],
	// 				['Rent', future.adjustedHousing],
	// 				['Commute', future.adjustedTransport], 
	// 				['Leisure', future.adjustedLeisure], 
	// 				['Misc.', future.adjustedOther]];
	// come back to this later
	// let maxExpense = expenses.map(function() { return o.y; })

	const body = {
		cashFlow: moneyFlow,
		financialIndicator: financialStatus,
		stateCost: costDiff,
		currState: future.currentStateAbbr,
		futureState: future.futureStateAbbr, 
		pieChart: [
			['Expense', 'Dollars'],
	        ['Food', future.adjustedFood], 
	        ['Rent', future.adjustedHousing],
	        ['Commute', future.adjustedTransport],
	        ['Leisure', future.adjustedLeisure],
	        ['Misc.', future.adjustedOther],
		],
		barChart: [['', 'In', 'Out'],
                  ['Cash Flow', future.moneyIn_tax, future.adjustedMoneyOut_tax],
        ],
	}
    res.send(body);
});

//testing future results
app.get('/futureDataTest', (req, res) => {
    // assemble an object containing the data we want to send
    const body = {
        pieChart: [
	        ['Expense', 'Dollars'],
	        ['Food', 2000], ['Rent', 4000],
	        ['Commute', 2500],
	        ['Entertainment', 1500],
	        ['Utilities', 350],
        ],
        barChart: [['Month', 'In', 'Out'],
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
                  ['Dec', 10000, 7234],]

    }
    // send the response as JSON text to the client
    res.json(body)
});




// app.listen(4000);

module.exports = app.listen(4000);


// uncomment when ready for testing
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })



