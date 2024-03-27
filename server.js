// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ngrok = require('ngrok');
const ejs = require('ejs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const animalRoutes = require('./routes/animalsEndpoints');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();
const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded.data;
    next();
  });
}

async function getData() {
  // In a real application, you would query the database to get the data
  return [
    { Name: 'ไอ้ทอง', Breed: 'Varanus salvator', Age: 3, Gender: 'Male', Price: 'free', Status: 'หาบ้านใหม่', Description: 'Friendly and playful' },
  ];
}

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'TestAPI',
});

app.use(bodyParser.json());
app.use('/auth', authRoutes); // Use auth routes
app.use('/animals', verifyToken, animalRoutes);

app.set('view engine', 'ejs');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', async (req, res) => {
  try {
    const data = await getData();
    res.render('index', { data });
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

ngrok.connect({
  proto: 'http',
  addr: PORT,
}).then(url => {
  console.log(`Ngrok URL: ${url}`);
}).catch(error => {
  console.error('Error starting ngrok:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
