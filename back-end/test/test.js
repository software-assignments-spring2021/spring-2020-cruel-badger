
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;

require('../db.js');
const mongoose = require('mongoose');
const Plan = mongoose.model('Plan');
const User = mongoose.model('User');

const express = require('express');
const app = express();
require("../app.js");




describe('User Model', function() {
	describe('#save()', function() {
		it('should not save a new User without a Token specified', function(done) {
				const user = new User({
  					username: "user123",
					email: "user123@gmail.com",
					password: "12345678",
					plans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }]
				});
      				user.save(function(err) {
	        			expect(err).to.exist
          				.and.be.instanceof(Error)
        				done();
      			});
		});


		it('should not save a new User without a Username or Password specified', function(done) {
				const user = new User({
					email: "user123@gmail.com",
					plans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }]
				});
      				user.save(function(err) {
	        			expect(err).to.exist
          				.and.be.instanceof(Error)
        				done();
      			});
		});

		it('should not save a new User without an email specified', function(done) {
				const user = new User({
  					username: "user123",
					password: "12345678",
					plans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }]
				});
      				user.save(function(err) {
	        			expect(err).to.exist
          				.and.be.instanceof(Error)
        				done();
      			});
		});
	});
});





describe('Plan Model', function() {
	describe('#save()', function() {
		it('should not save a new Plan without a username or password specified', function(done) {
				const plan = new Plan({
  					name: "Chill in HI",
					currentStateAbbr: "NY",
					futureStateAbbr: "HI",
					currentStateLong: "New York",
					futureStateLong:  "Hawaii",
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
				});
      				plan.save(function(err) {
	        			expect(err).to.exist
          				.and.be.instanceof(Error)
        				done();
      				});
		});

		it('should not save a new Plan without all specified credentials', function(done) {
				const plan = new Plan({
  					name: "Chill in HI",
					currentStateAbbr: "NY",
					futureStateAbbr: "HI",
					currentStateLong: "New York",
					futureStateLong:  "Hawaii",
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
		        	}
				
				});
      				plan.save(function(err) {
	        			expect(err).to.exist
          				.and.be.instanceof(Error)
        				done();
      				});
		});
	});
});


describe('GET /', function() {
	it("should not render a page for this path", (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('GET /future', function() {
	it("should render future page with the response body as an object", (done) => {
        chai.request(app)
        .get('/future')
        .end((err, res) => {
            //res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});



describe("GET /future", () => {
	it("Should return a response back as an object", (done) => {
		chai.request(app)
		.get("/future")
		.end((err, res) => {
			res.body.should.be.a('object');
			done();
		})
	})
	
})



describe("State abbreviation", () => {
	describe("#abbrToState()", function() {
		it("Should return the state for which it is an abbreviation", () => {
			assert.equal(abbrToState("WI"), "Wisconsin");
		});

		it("Should return an error message when given invalid input", () => {
			assert.equal(abbrToState("XY"), "Invalid state abbr");
		});
	});
	
});


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






// describe("Form processing", () => {

// 	it("Should return an error from axios", (done) => {
// 		chai.request(app).post("/processFormData")
// 		.send({"{}": ""}).end((err, res) => {
// 			expect(res).to.have.status(400);
// 			done()
// 		})
// 	})

// 	it("Should return a proper object", (done) => {
// 		chai.request(app).post("/processFormData")
// 		.send({"{futureState: 'NY', salary: 100000}": ""}).end((err, res) => {
// 			expect(res).to.be.json;
// 			done()
// 		})
// 	})
// })

// describe("Form results", () => {
// 	it("Should return a form object with text field properties", done => {
// 		chai
// 			.request(app)
//             .post('/processFormData')
//             .send({
// 		      		name: "Work in WI",
// 		      		currentStateAbbr: "NY",
// 		      		futureStateAbbr: "WI",
// 		      		currentStateLong: "New York",
// 		      		futureStateLong: "Wisconsin",
// 		      		currentStateData: {
// 		            "State": "New York",
// 		            "costIndex": "139.1000",
// 		            "costRank": 48,
// 		            "groceryCost": "114.8000",
// 		            "housingCost": "204.4000",
// 		            "utilitiesCost": "108.7000",
// 		            "transportationCost": "116.6000",
// 		            "miscCost": "104.8000"
// 		        }})
//             .end((err, res) =>{
//             	expect(res).to.be.a('object');
//                 expect(res).to.be.a('string');
//                 done();
//         });
// 	});

//     it("Should send a Status Code 400 for required input missing", done => {
//     	chai
//     		.request(app)
//             .post('/processFormData')
//             .send({
// 		      		name: null,
// 		      		currentStateAbbr: null,
// 		      		futureStateAbbr: null,
// 		      		currentStateLong: null,
// 		      		futureStateLong: null,
// 		      		currentStateData: {
// 		            "State": null,
// 		            "costIndex": null,
// 		            "costRank": null,
// 		            "groceryCost": null,
// 		            "housingCost": null,
// 		            "utilitiesCost": null,
// 		            "transportationCost": null,
// 		            "miscCost": null
// 		        }})
//             .end((err, res) =>{
//     			expect(res).to.have.status(400);
//                 done();
//         });
//     });

//     it("Should send a Status Code 200 for complete form", done => {
//     	chai
//     		.request(app)
//             .post('/processFormData')
//             .send({
// 		      		name: "Work in WI",
// 		      		currentStateAbbr: "NY",
// 		      		futureStateAbbr: "WI",
// 		      		currentStateLong: "New York",
// 		      		futureStateLong: "Wisconsin",
// 		      		currentStateData: {
// 		            "State": "New York",
// 		            "costIndex": "139.1000",
// 		            "costRank": 48,
// 		            "groceryCost": "114.8000",
// 		            "housingCost": "204.4000",
// 		            "utilitiesCost": "108.7000",
// 		            "transportationCost": "116.6000",
// 		            "miscCost": "104.8000"
// 		        }})
//             .end((err, res) =>{
//     			expect(res).to.have.status(200);
//                 done();
//         });
//     });
// });



// describe("Correct Form Calculations", () => {

// 	//-----Food Calculations----
// 	it("Should return correct average food calculations if done daily", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveFood: 10,foodType: daily": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyFood, "3650");
// 				done();
// 			});

// 	});

// 	it("Should return correct average food calculations if done weekly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveFood: 10,foodType: weekly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyFood, "520");
// 				done();
// 			});

// 	});
// 	it("Should return correct average food calculations if done monthly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveFood: 10,foodType: monthly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyFood, "120");
// 				done();
// 			});

// 	});


// 	//-----Transportation Calculations----
// 	it("Should return correct average transportation calculations if done daily", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveTransport: 10,transportType: daily": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyTransport, "3650");
// 				done();
// 			});

// 	});	
// 	it("Should return correct average transportation calculations if done weekly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveTransport: 10,transportType: weekly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyTransport, "520");
// 				done();
// 			});

// 	});
// 	it("Should return correct average transportation calculations if done monthly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveTransport: 10,transportType: monthly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyTransport, "120");
// 				done();
// 			});

// 	});


// 	//----Savings Calculations----
// 	it("Should return correct average savings calculations if done daily", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveSavings: 10, savingsType: daily": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlySavings, "3650");
// 				done();
// 			});

// 	});
// 	it("Should return correct average savings calculations if done weekly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveSavings: 10, savingsType: weekly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlySavings, "520");
// 				done();
// 			});

// 	});
// 	it("Should return correct average savings calculations if done monthly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveSavings: 10, savingsType: monthly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlySavings, "120");
// 				done();
// 			});

// 	});


// 	//----Leisure Calculations----
// 	it("Should return correct average leisure calculations if done daily", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveLeisure: 10, leisureType: daily": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyLeisure, "3650");
// 				done();
// 			});

// 	});
// 	it("Should return correct average leisure calculations if done weekly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveLeisure: 10, leisureType: weekly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyLeisure, "520");
// 				done();
// 			});

// 	});
// 	it("Should return correct average leisure calculations if done monthly", done => {
// 		chai
// 			.request(app)
// 			.post('/processFormData')
// 			.send({
// 				"aveLeisure: 10, leisureType: monthly": ""
// 			})
// 			.end((err, res) =>{
// 				assert.equal(res.yearlyLeisure, "120");
// 				done();
// 			});

// 	});

// });