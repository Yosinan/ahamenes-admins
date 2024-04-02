const mongoose = require("mongoose");

// Create a Mongoose schema for Events

const imgSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    mimetype: {
        type: String,
    },
});


const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    host: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    place: {
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


    dateAdded: {
        // type: Date,
        // default: Date.now,
        type: Date,
        default: Date.now,
    },

});

eventSchema.set("toJSON",
    {
        transform: (_, obj) => {
            obj.id = obj._id;
            delete obj._id;
            delete obj.__v;

        },
    })

// Create a Mongoose model for Events
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;