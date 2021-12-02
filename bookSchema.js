const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    copies: {
        type: Number,
        required: true
    }
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;