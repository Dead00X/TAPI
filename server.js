require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const ngrok = require('ngrok');

const animalRoutes = require('./routes/animalsEndpoints'); // Import animal routes

const app = express();
const PORT = 3000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'TestAPI',
});

// Body parser middleware
app.use(bodyParser.json());

// Use imported animal routes
app.use('/animals', animalRoutes);

// Get data for index.html
const getData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Handle request for index.html
app.get('/index', async (req, res) => {
  const data = await getData();
  res.render('index', { data });
});

// Start ngrok and bind it to port 3000
ngrok.connect({
  proto: 'http',
  addr: PORT,
}).then(url => {
  console.log(`Ngrok URL: ${url}`);
}).catch(error => {
  console.error('Error starting ngrok:', error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
