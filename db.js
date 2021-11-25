const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

async function connectToDB() {
    mongoose.connect(mongoURI);
}

module.exports = connectToDB;