// routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');

// Load environment variables from .env file using 'dotenv'
require('dotenv').config();

// Login Route
router.post('/login', async (req, res) => {
  // Implement your login logic here
  const { username, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      `${process.env.jwtSecret}`, // Access jwtSecret from environment variables
      { expiresIn: 3600 }, // Token expiration time in seconds
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Registration Route
router.post(
  '/register',
  [
    // Add validation for username and password if needed
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Implement your registration logic here
    const { username, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user
      user = new User({ username, password });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Generate a JWT token for the newly registered user
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        `${process.env.jwtSecret}`, // Access jwtSecret from environment variables
        { expiresIn: 3600 }, // Token expiration time in seconds
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
