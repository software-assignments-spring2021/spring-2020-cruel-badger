const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../db.js');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;




// Handle user registration
passport.use('sign-up', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
    try {
      console.log("YOU ARE IN THE SIGN-UP!!!");
      //Save the information provided by the user to the the database
      const user = await UserModel.create({ email, password });
      //Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

// Handle user login
passport.use('log-in', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    console.log("YOU ARE IN THE LOG-IN!!!");
    //Find the user associated with the email provided by the user
    const user = await UserModel.findOne({ email });
    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    //Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// Verify token sent by user is valid
passport.use(new JWTstrategy(opts, function(jwt_payload, done) {
  console.log("passport use");
  console.log(jwt_payload);
    UserModel.findOne({email: jwt_payload.email}, function(err, user) {
      console.log(user);
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

/*
passport.use(new JWTstrategy({

  secretOrKey : 'top_secret',
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken();
}, async (token, done) => {
  try {
    console.log("TRYING TO VERIFY TOKEN!!!");
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
*/





