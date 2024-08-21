const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
}, { timestamps: true });

// {
// trim is removing the extra spaces => removes from only beginning and end

// in db there will be seven entries => name, email, password, _id, createdAt, updatedAt, __v
// }

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
