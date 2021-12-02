const mongoose = require('mongoose');

require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

async function connectToDB() {
    await mongoose.connect(mongoURI);
}

module.exports = connectToDB;