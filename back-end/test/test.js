const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);

const assert = chai.assert

describe("Make sure backend is running", () => {
	it("Should return a 200", (done) => {
		chai.request(app).get("/").end((err, res) => {
			expect(res).to.have.status(200);
			done();
		})
	})
	it("Should print a boring statement", (done) => {
		chai.request(app).get("/").end((err, res) => {
			assert.equal(res.body, "This is the backend")
			done();
		})
	})
	
})

describe("State abbreviation", () => {
	it("Should return the state for which it is an abbreviation", () => {
		assert.equal(abbrToState("WI"), "Wisconsin");
	})

	it("Should return an error message when given invalid input", () => {
		assert.equal(abbrToState("XY"), "Invalid state abbr");
	})
})

describe("Form processing", () => {

	it("Should return an error from axios", (done) => {
		chai.request(app).post("/processFormData")
		.send({"{}": ""}).end((err, res) => {
			expect(res).to.have.status(400);
			done()
		})
	})

	it("Should return a proper object", (done) => {
		chai.request(app).post("/processFormData")
		.send({"{futureState: 'NY', salary: 100000}": ""}).end((err, res) => {
			expect(res).to.be.json;
			done()
		})
	})
})

describe("Form results", () => {
	it("Should return a form object with text field properties", done => {
		chai
			.request(app)
            .post('/processFormData')
            .send({
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
		        }})
            .end((err, res) =>{
            	expect(res).to.be.a('object');
                expect(res).to.be.a('string');
                done();
	});

    it("Should send a Status Code 400 for required input missing", done => {
    	chai
    		.request(app)
            .post('/processFormData')
            .send({
		      		name: null,
		      		currentStateAbbr: null,
		      		futureStateAbbr: null,
		      		currentStateLong: null,
		      		futureStateLong: null,
		      		currentStateData: {
		            "State": null,
		            "costIndex": null,
		            "costRank": null,
		            "groceryCost": null,
		            "housingCost": null,
		            "utilitiesCost": null,
		            "transportationCost": null,
		            "miscCost": null
		        }})
            .end((err, res) =>{
    			expect(res).to.have.status(400);
                done();
    });

    it("Should send a Status Code 200 for complete form", done => {
    	chai
    		.request(app)
            .post('/processFormData')
            .send({
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
		        }})
            .end((err, res) =>{
    			expect(res).to.have.status(200);
                done();
    });
});