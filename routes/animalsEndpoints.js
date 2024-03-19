const express = require('express');
const Animal = require('../schema/animalSchema'); // Import Animal model

const router = express.Router();

// Create a new animal
router.post('/', async (req, res) => {
  try {
    const newAnimal = await Animal.create(req.body);
    res.json(newAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an animal
router.put('/:animalId', async (req, res) => {
  try {
    const updatedAnimal = await Animal.findOneAndUpdate({ _id: req.params.animalId }, req.body, { new: true });
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an animal
router.delete('/:animalId', async (req, res) => {
  try {
    await Animal.findOneAndDelete({ _id: req.params.animalId });
    res.send('Animal deleted successfully');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; // Export router for use in server.js
