const express = require('express');
const mongoose = require('mongoose');
const bodParser = require('body-parser');
const cors = require('cors');
const footRoutes = require('./routes/foods');

const app = express();
const PORT = process.env.PORT || 3000;
const apiPrefix = '/api/foodtruckk/foods';

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


app.use(apiPrefix, footRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
