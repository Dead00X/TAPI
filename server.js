require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
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
  try {
    // แทนที่ด้วยคิวรี่ฐานข้อมูลจริงโดยใช้ Mongoose
    return [
      { Name: 'ไอ้ทอง', Breed: 'Varanus salvator', Age: 3, Gender: 'Male', Price: 'free', Status: 'หาบ้านใหม่', Description: 'Friendly and playful' },
    ];
  } catch (error) {
    console.error('Error getting data:', error);
    // พิจารณาการส่งคืนการตอบสนองข้อผิดพลาดที่ให้ข้อมูลมากขึ้นที่นี่
    return null;
  }
}

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  dbName: 'TestAPI',
});

app.use(bodyParser.json());
app.use('/auth', authRoutes); // ใช้เส้นทางการยืนยันตัวตน
app.use('/animals', verifyToken, animalRoutes);

app.set('view engine', 'ejs');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', async (req, res) => {
  try {
    const data = await getData();
    if (data) { // ตรวจสอบว่าการดึงข้อมูลสำเร็จหรือไม่
      res.render('index', { data });
    } else {
      res.status(500).send('Internal Server Error (Data retrieval failed)');
    }
  } catch (error) {
    console.error('Error rendering the page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ... (โค้ดที่เหลือของคุณ รวมถึงการจัดการข้อผิดพลาดที่เป็นไปได้สำหรับเส้นทางอื่น ๆ )

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
