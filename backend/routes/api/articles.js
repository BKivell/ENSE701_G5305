// routes/api/articles.js

const express = require('express');
const router = express.Router();
const Article = require('../../models/article');

// @route   GET api/articles
// @desc    Get a list of articles
// @access  Public
router.get('/', async (req, res) => {

  try {
    const articles = await Article.find();
    
    res.json(articles);

  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

module.exports = router;
