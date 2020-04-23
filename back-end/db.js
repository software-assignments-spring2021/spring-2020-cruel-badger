const mongoose = require('mongoose');




const Plan = new mongoose.Schema({
	name: {type: String, required: true},
	currentStateAbbr: {type: String, required: true},
	futureStateAbbr: {type: String, required: true},
	currentStateLong: {type: String, required: true},
	futureStateLong: {type: String, required: true},
	currentStateData: {type: Object, required: true},
	futureStateData: {type: Object, required: true},
	yearlyIncome: {type: Number, required: true},
	yearlyOtherIncome: {type: Number, required: true},
	moneyIn:{type: Number, required: true},
	moneyIn_tax: {type: Number, required: true},
	yearlyHousing: {type: Number, required: true},
	yearlyFood: {type: Number, required: true},
	yearlyTransport: {type: Number, required: true},
	yearlySavings: {type: Number, required: true},
	yearlyLeisure: {type: Number, required: true},
	yearlyOther: {type: Number, required: true},
	moneyOut: {type: Number, required: true},
	moneyOut_tax: {type: Number, required: true},
	adjustedFood: {type: Number, required: true},
	adjustedHousing: {type: Number, required: true},
	adjustedTransport: {type: Number, required: true},
	adjustedLeisure: {type: Number, required: true},
	adjustedOther: {type: Number, required: true},
	adjustedMoneyOut: {type: Number, required: true},
	adjustedMoneyOut_tax: {type: Number, required: true},
}, {
	_id: true
});


const Token = new mongoose.Schema({
	token: {type: String, required: true},
}, {
	_id: true
})

const User = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	tokens: [Token],
	plans: [Plan]
})


mongoose.model("User", User);


mongoose.connect("mongodb+srv://admin:cruelbadger2020@broke-millennial-vnlui.mongodb.net/test?retryWrites=true&w=majority")


