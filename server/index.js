require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const footRoutes = require('./routes/foods');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const loginRoutes = require('./routes/login');

const PORT = process.env.PORT || 3000;
const apiFoodUri = '/api/foodtruckk/foods';
const apiUserUri = '/api/foodtruckk/users';
const apiOrderUri = '/api/foodtruckk/orders';
const apiLoginUri = '/api/foodtruckk/login';
const mongoUri = process.env.MONGO_URI;


app.use(bodParser.json());
app.use(cors());

async function connectoToMongoDB() {
    await mongoose.connect(mongoUri, {
        family : 4,
        serverSelectionTimeoutMS: 20000
    });
}

connectoToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.log('CONNECTION ERROR', err));


app.use(apiFoodUri, footRoutes);
app.use(apiUserUri, userRoutes);
app.use(apiOrderUri, orderRoutes);
app.use(apiLoginUri, loginRoutes);

console.log('>>APP', app);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
