// server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the cors middleware

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/data', require('./routes/api'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/submit', require('./routes/api/submit'));
app.use('/api/articles', require('./routes/api/articles'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
