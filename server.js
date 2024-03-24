// server.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ngrok = require('ngrok');
const ejs = require('ejs'); // Import EJS
const cors = require('cors');

const animalRoutes = require('./routes/animalsEndpoints'); // Import animal routes

const app = express();
const PORT = process.env.PORT || 3000;



const corsOptions = {
  origin: ['https://healword.me/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
};

// Function to get data (dummy function for demonstration purposes)
async function getData() {
  // In a real application, you would query the database to get the data
  return [
    { Name: 'ไอ้ทอง', Breed: 'Varanus salvator', Age: 3, Gender: 'Male', Price: 'free', Status: 'หาบ้านใหม่', Description: 'Friendly and playful' },
  ];
}

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

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Handle request for index.ejs
app.get('/', async (req, res) => {
  try {
    const data = await getData();
    res.render('index', { data }); // Render index.ejs with data
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).send('Internal Server Error');
  }
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
