const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const books = require('./routes/api/books.js');
const submit = require('./routes/api/submit.js');
const articles = require('./routes/api/articles.js');

const app = express();

// Connect Database
connectDB();

// Enable CORS
app.use(cors({ origin: true, credentials: true }));

// Middleware to parse JSON data
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Use Routes
app.use('/api/books', books);
app.use('/api/submit', submit);
app.use('/api/articles', articles);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
