// routes/api.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/search
// @desc    Search for data
// @access  Public
router.get('/search', (req, res) => {
  try {
    const searchTerm = req.query.search; // Get the search query from the request query parameters

    YourModel.find({ title: { $regex: searchTerm, $options: 'i' } }, (err, searchResults) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      res.json(searchResults);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const DummyModel = require('../models/DummyModel');

// Define the POST route for adding dummy data
router.post('/add-dummy-data', async (req, res) => {
  try {
    // Create a new dummy data object based on your schema
    const newDummyData = new DummyModel({
      title: 'Dummy Title',
      author: 'Dummy Author',
      year: 2023,
      claim: 'Dummy Claim',
      evidence: 'Dummy Evidence',
    });

    // Save the new dummy data to the database
    await newDummyData.save();

    res.status(201).json({ message: 'Dummy data added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;