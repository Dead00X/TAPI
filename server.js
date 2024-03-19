require('dotenv').config(); // โหลดข้อมูลตัวแปรจากไฟล์ env

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
