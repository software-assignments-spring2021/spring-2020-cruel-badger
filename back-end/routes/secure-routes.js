// give users with verified tokens access

const express = require('express');
const router = express.Router();



// Display the info that belongs to that user
router.get('/dashboard', (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});

module.exports = router;