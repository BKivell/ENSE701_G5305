const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const auth = require('../middleware/auth');

// @route   GET api/articles
// @desc    Search for articles
// @access  Public
router.get('/articles', async (req, res) => {
  try {
    const searchTerm = req.query.search;

    // Use Mongoose to search for articles in your model
    const searchResults = await Article.find({
      title: { $regex: searchTerm, $options: 'i' },
    });

    res.json(searchResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/articles
// @desc    Add an article
// @access  Public
router.post('/articles', async (req, res) => {
  try {
    const { title, author, year, claim, evidence } = req.body;

    // Create a new article object based on your model
    const newArticle = new Article({
      title,
      author,
      year,
      claim,
      evidence,
    });

    // Save the new article to the database
    await newArticle.save();

    res.status(201).json({ message: 'Article added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
