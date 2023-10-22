// app.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const books = require('./routes/api/books.js');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

////////
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  
  // Email configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: 'recipient-email@example.com', 
    subject: 'title',
    text: 'description',
  };

  // Sending email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
});




