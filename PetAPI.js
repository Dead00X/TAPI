const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TestAPI', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'TestAPI' });

// Define Animal Schema
const animalSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    Name: { type: String, required: true },
    Breed: { type: String, required: true },
    Age: { type: Number, required: true },
    Gender: { type: String, enum: ['Male', 'Female'], required: true },
    Price: { type: Number, required: true },
    Status: { type: String, enum: ['Available', 'Reserved', 'Sold'], required: true },
    Images: [String],
    Description: String
});

const Animal = mongoose.model('Animal', animalSchema);

app.use(bodyParser.json());

// Create a new animal
app.post('/animals', async (req, res) => {
    try {
        const newAnimal = await Animal.create(req.body);
        res.json(newAnimal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all animals
app.get('/animals', async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an animal
app.put('/animals/:animalId', async (req, res) => {
    try {
        const updatedAnimal = await Animal.findOneAndUpdate({ _id: req.params.animalId }, req.body, { new: true });
        res.json(updatedAnimal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an animal
app.delete('/animals/:animalId', async (req, res) => {
    try {
        await Animal.findOneAndDelete({ _id: req.params.animalId });
        res.send('Animal deleted successfully');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
