// models/article.js
const mongoose = require('mongoose');

// Define the Article schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  se_practice: {
    type: String,
  },
  claim: {
    type: String,
    required: true,
  },
  result_of_evidence: {
    type: String,
  },
  type_of_research: {
    type: String,
  },
  approved: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
  },
  details: {
    type: String,
  },
  grade: {
    type: String,
  },
});

// Create a model based on the schema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
