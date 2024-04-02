const { json } = require('express');
const Team = require('../models/teamModel');
const multer = require('multer');
const path = require('path');


// Set up multer for file uploads
const Storage = multer.diskStorage({
    destination: '../admin-dash/uploads/team/img',
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
}).array('file', 7);



// Multer storage configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../admin-dash/uploads/team/img') 
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// });

// // Initialize multer upload middleware with the specified storage configuration
// const upload = multer({ storage: storage }).single('file');


// Set up routes for Teams

// Add Teams (logged in teams only)
const addTeam = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err.message);
            }

            if (!req.files) {
                return res.status(400).send('No images uploaded or no files found');
            }
            if (req.files.length > 1) {
                return res.status(400).send('Too many images uploaded');
            }


            const img = req.files.map((file) => {
                return {
                    mimetype: file.mimetype,
                    filename: file.filename,
                }
            }
            );

            const team = new Team({
                name: req.body.name,
                role: req.body.role,
                description: req.body.description,
                // images: img,
                // addedBy: req.team._id,
                // addedByteamname: req.team.name,
            })

            // console.log(team);
            const t = await team.save();
            if (!t) {
                return json.status(400).send("Team not saved");
            }
            res.status(201).json({ Team, message: 'Team added successfully' });

        });

    } catch (err) {
        res.status(500).send("Our side: " + err);
    }
};

// GET all Teams
const getTeams = async (req, res, next) => {
    try {
        const Teams = await Team.find();
        res.status(200).json(Teams);
    } catch (err) {
        next(err);
    }

};

const getTeamById = async (req, res, next) => {
    try {

        const team = await Team.findOne({ _id: req.params.id });
        if (!team) {
            return res.status(404).send("Team not found");
        }
        res.status(200).json(team);

    } catch (err) {
        next(err);
    }
};



// DELETE a Team by ID 
const deleteTeam = async (req, res, next) => {
    try {
        const TeamId = req.params.id;
        const team = await Team.findOne({ _id: TeamId });
        if (!team) {
            return res.status(404).send("Team not found or unauthorized to delete.");
        }

        await team.deleteOne({ _id: TeamId });
        res.send("Team Deleted");
    } catch (err) {
        next(err);
    }
};

// Edit a Team by ID 
const editTeam = async (req, res, next) => {
    try {
        const TeamId = req.params.id;

        const team = await Team.findOne({ _id: TeamId });

        if (!team) {
            return res.status(404).send("Team not found or unauthorized to edit.");
        }

        team.set(req.body);
        const updatedTeam = await team.save();

        res.send(updatedTeam);
    } catch (err) {
        next(err);
    }
};


// search Teams by name

const searchTeams = async (req, res, next) => {
    try {
        const Teams = await Team.find({ name: req.params.name });
        res.send(Teams);
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getTeams,
    // getTeamById,
    getTeamById,
    deleteTeam,
    addTeam,
    editTeam,
    searchTeams
}