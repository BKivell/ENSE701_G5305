// routes/api.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/data
// @desc    Get protected data
// @access  Private
router.get('/', auth, (req, res) => {
  try {
    // Access user information from req.user (from the auth middleware)
    res.json({ user: req.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
