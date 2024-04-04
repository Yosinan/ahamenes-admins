const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const auth = require("../middlewares/auth");
const {
    getTeams,
    // getTeamById,
    getTeamById,
    deleteTeam,
    addTeam,
    editTeam,
    searchTeams

} = require("../controllers/teamController");

app.use(cors());

// using the APIs

router.post("/add",  addTeam);
router.put("/update/:id", auth, editTeam);
router.delete("/delete/:id", auth, deleteTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.get("/search/:name", searchTeams);



module.exports = router;