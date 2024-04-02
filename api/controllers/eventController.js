const { json } = require('express');
const Event = require('../models/eventModel');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const Storage = multer.diskStorage({
    destination: '../admin-dash/uploads/event/img',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});


const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only images are allowed'));
        }
    }
}).array('images', 7);


// Set up routes for Events

// Add Events 
const addEvent = async (req, res) => {
    try {
        // upload(req, res, async (err) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).send(err.message);
        //     }

        //     if (req.files.length === 0 || !req.files) {
        //         return res.status(400).send('No images uploaded or no files found');

        //     }
        //     if (req.files.length > 5) {
        //         return res.status(400).send('Too many images uploaded');
        //     }


        //     const imgArray = req.files.map((file) => {
        //         return {
        //             mimetype: file.mimetype,
        //             filename: file.filename,
        //         }
        //     });


        const event = new Event({
            eventName: req.body.eventName,
            host: req.body.host,
            time: req.body.time,
            place: req.body.place,
            description: req.body.description,
            // images: imgArray,
            // addedBy: req.team._id,
            // addedByteamname: req.team.name,
        })

        console.log(event);
        const e = await event.save();
        if (!e) {
            return json.status(400).send("Event not saved");
        }
        res.status(201).json({ event, message: 'Event added successfully' });

    } catch (err) {
        res.status(500).send("Our side " + err);
    }
};

// GET all Events
const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }

};

const getEventById = async (req, res, next) => {
    try {

        const event = await Event.findOne({ _id: req.params.id });
        if (!event) {
            return res.status(404).send("Event not found");
        }
        res.status(200).json(event);

    } catch (err) {
        next(err);
    }
};



// DELETE a Event by ID 
const deleteEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).send("Event not found or unauthorized to delete.");
        }

        await event.deleteOne({ _id: eventId });
        res.send("Event Deleted");
    } catch (err) {
        next(err);
    }
};

// Edit a Event by ID 
const editEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findOne({ _id: eventId });

        if (!event) {
            return res.status(404).send("Event not found or unauthorized to edit.");
        }

        event.set(req.body);
        const updatedEvent = await event.save();

        res.status(201).json({ updatedEvent, messgae:"Event updated successfully"});
    } catch (err) {
        next(err);
    }
};


// search Events by name

const searchEvents = async (req, res, next) => {
    try {
        const events = await Event.find({ name: req.params.name });
        res.send(events);
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getEvents,
    getEventById,
    deleteEvent,
    addEvent,
    editEvent,
    searchEvents
}