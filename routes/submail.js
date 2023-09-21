const express = require('express');
const router = express.Router();
const UserModel = require("../models/Mail.js");

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/email.html");
});


// POST route for email subscription
router.post('/', async (req, res) => {
  try {
    // Extract the email from the request body
    const { useremail } = req.body;

    // Create a new User model instance and save it to the database
    const user = new UserModel({
      email: useremail,
    });

    const user_res = await user.save();
    console.log('Email subscription saved:', user_res);

    res.status(200).json({ message: 'Email subscription successful' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    res.status(500).json({ message: 'Error subscribing email' });
  }
});

module.exports = router;
