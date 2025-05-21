const express = require('express');
const mongoose = require('mongoose');
const bodParser = require('body-parser');
const cors = require('cors');
const footRoutes = require('./routes/foods');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 3000;
const apiFoodUri = '/api/foodtruckk/foods';
const apiUserUri = '/api/foodtruckk/users';
const apiOrderUri = '/api/foodtruckk/orders';

app.use(bodParser.json());
app.use(cors());

async function connectoToMongoDB() {
    await mongoose.connect('mongodb://foodtruckk-mongo-1:27017/foodtruckk', {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
