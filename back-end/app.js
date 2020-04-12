const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	console.log("In middleware")
	console.log(req.path);
	console.log(req.body);
	next();
})


app.get("/", (req, res) => {
	res.send("This is the backend");
})


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

	console.log(`Yearly leisure costs: ${yearlyLeisure}`)


	let aveOther = (parseFloat(formData.otherLow) + parseFloat(formData.otherHigh)) / 2;
	let yearlyOther = 0;
	if (formData.otherType === "weekly") {
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
	    "state":formData.state,
	    "filing_status":"single",
	    "pay_rate":yearlyIncome
	    }
    })
    .then((response)=> {
      console.log(`Future name is  ${formData.planName}`)
      console.log(`State is ${formData.state}`)
      console.log(`Income is ${yearlyIncome}`)
      //console.log(response.data)

      let totalTax = response.data.annual.fica.amount + response.data.annual.federal.amount + response.data.annual.state.amount;
      console.log(`Total tax is ${totalTax}`)

      
      let moneyIn = yearlyIncome + yearlyOtherIncome;

      let moneyOut = yearlyHousing + yearlyFood + yearlyTransport + yearlySavings + yearlyLeisure + yearlyOther + totalTax + yearlyDebt;

      console.log(`MONEY COMING IN PER YEAR: ${moneyIn}`)
      console.log(`MONEY GOING OUT PER YEAR: ${moneyOut}`)


      //ADDED BY SKYE
      let formObj = {	name: formData.planName, 
      					state: formData.state, 
      					income: yearlyIncome,
      					tax: totalTax,
      					inFlow: moneyIn,
      					outFlow: moneyOut
      				};
      	console.log(formObj);


    })
    .catch((error)=>{
      console.log(error)
    })
})



app.listen(4000);

