// C:\Users\locon\Desktop\COde\restaurante\backend\server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is the ERP system backend');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
