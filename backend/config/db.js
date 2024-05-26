const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = process.env.MONGO_URL;

mongoose.connect(connectDB)
    .then(() => {
        console.log('Hurrrayyyyy connection successful !');
    })
    .catch(err => {
        console.error('Database connection error',err);
    });