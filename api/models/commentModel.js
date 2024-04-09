const mongoose = require('mongoose');

// Create a Mongoose schema for Comments

const commentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;