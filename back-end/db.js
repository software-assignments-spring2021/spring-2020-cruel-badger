var dotenv = require('dotenv').config();
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
	email: {type: String, required: true},
	password: {type: String, required: true},
	tokens: [Token],
	plans: [Plan]
})

// Hash the password before you save the object
User.pre('save', async function (next) {
    const myUser = this
    if (myUser.isModified('password')) {
        myUser.password = await bcrypt.hash(myUser.password, 8)
    }
    next()
})

// Use JWT to sign the token, define key in .env file
User.methods.generateAuthToken = async function() {
    const myUser = this
    const token = jwt.sign({_id: myUser._id}, process.env.JWT_KEY)
    myUser.tokens = myUser.tokens.concat({token})
    await myUser.save()
    return token
}

// Search for a user with the username provided, return an err if credentials are invalid
User.statics.findByCredentials = async (username, password) => {
    const myUser = await User.findOne({ username } )
    if (!myUser) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, myUser.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return myUser
}



mongoose.model("User", User);


mongoose.connect(process.env.MONGOATLAS_URL);


