const express = require('express');
const router = express.Router();
const articleModel = require('../../models/article');

// @route GET api/submit/test
// @description Tests submit route
// @access Public
router.get('/test', (req, res) => res.send('Submit route testing!'));

// @route POST api/submit
// @description Add/Save an article
// @access Public
router.post('/', (req, res) => {
  articleModel.create(req.body)
    .then(article => res.json({ msg: 'Article added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this article' }));
});

// @route PUT api/submit/:id
// @description Update an article
// @access Public
router.put('/:id', (req, res) => {
  articleModel.findByIdAndUpdate(req.params.id, req.body)
    .then(article => res.json({ msg: 'Article updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the article' })
    );
});

// @route DELETE api/submit/:id
// @description Delete an article by id
// @access Public
router.delete('/:id', (req, res) => {
  articleModel.findByIdAndRemove(req.params.id, req.body)
    .then(article => res.json({ msg: 'Article entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such article' }));
});

module.exports = router;
