const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const auth = require("../middlewares/auth");
const {
    getEvents,
    getEventById,
    deleteEvent,
    addEvent,
    editEvent,
    searchEvents

} = require("../controllers/eventController");

app.use(cors());

// using the APIs

router.post("/add", addEvent);
router.put("/edit/:id", editEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.get("/search/:name", searchEvents);



module.exports = router;