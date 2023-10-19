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

router.delete('/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const deletedArticle = await Article.findOneAndDelete({ id: articleId });

    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete the article' });
  }
});

// @route   DELETE api/articles/bytitle/:title
// @desc    Delete an article by title
// @access  Public
router.delete('/bytitle/:title', async (req, res) => {
  try {
    const articleTitle = req.params.title;
    const deletedArticle = await Article.findOneAndDelete({ title: articleTitle });

    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article by title:', error);
    res.status(500).json({ error: 'Failed to delete the article by title' });
  }
});

// @route   PUT api/articles/approve/:id
// @desc    Approve an article by id
// @access  Public
router.put('/:id', async (req, res) => {
  const articleId = req.params.id;
  console.log('articleId attempting to approve:', articleId)

  const temp = await Article.findByIdAndUpdate(articleId, { approved: true, checked: true })
    .then(article => res.json({ msg: 'Article approved successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to approve the article' }));

    console.log('temp:', temp)
});



module.exports = router;
