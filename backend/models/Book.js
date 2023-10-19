// models/Book.js
// will need to convert to match articles

const mongoose = require('mongoose');
 //title: "Title 1", author: "John", year: "2020", claim: "Claim 1", evidence: "Evidence 1" 
const BookSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  author: {
    type:String,
    required:true
  },
  year: {
    type:Number,
    required:true
  },
  claim: {
    type:String,
    required:true
  },
  evidence: {
    type:String,
    required:false
  },
  
});

module.exports = Book = mongoose.model('book', BookSchema);