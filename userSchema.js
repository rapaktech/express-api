const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
},
    firstName: {
        type: String,
        required: true
},
    lastName: {
        type: String,
        required: true
},
    books: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;