const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const animalRoutes = require('./routes/animals'); // Import animal routes

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://det:1928374655@cluster0.geicsiu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'TestAPI' });

// Body parser middleware
app.use(bodyParser.json());

// Use the animal routes
app.use('/animals', animalRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
