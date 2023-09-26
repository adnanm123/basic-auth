'use strict';

require('dotenv').config();
const express = require('express');
const { basicAuth } = require('./middleware/basic'); // Make sure the path is correct
const Users = require('./models/users-model');

const router = express.Router();

// POST route for user signup
router.post('/signup', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

// POST route for user signin
router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
