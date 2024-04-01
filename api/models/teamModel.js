const mongoose = require("mongoose");

// Create a Mongoose schema for teams

const imgSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    mimetype: {
        type: String,
    },
});


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [imgSchema],
        // required: true,
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,

    },
    addedByUsername: {
        type: String,
        // required: true,
    },
    dateAdded: {
        // type: Date,
        // default: Date.now,
        type: Date,
        default: Date.now,
    },

});

teamSchema.set("toJSON",
    {
        transform: (_, obj) => {
            obj.id = obj._id;
            delete obj._id;
            delete obj.__v;

        },
    })

// Create a Mongoose model for teams
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;