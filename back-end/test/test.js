const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const {expect} = chai;
chai.use(chaiHttp);

describe("Form results", () => {
	it("returns an object with several data properties", done => {
		chai
			.request(app)
            .post('/processFormData')
            .send({name: "Go to grad school", housingCost: "1500"})
            .end((err, res) =>{
                expect(res).to.be.a('string');
                done();
	});

});