const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);

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
		        })
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
		        })
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
		        })
            .end((err, res) =>{
    			expect(res).to.have.status(200);
                done();
    });
});