const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for uploaded image assets
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Base Route
app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Om Digital Prints Express API', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Om Digital Prints Express API server listening on port ${PORT}`);
});
