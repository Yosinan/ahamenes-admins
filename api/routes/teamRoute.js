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

router.post("/api/team/add",auth,  addTeam);
router.put("/api/team/edit/:id", auth, editTeam);
router.delete("/api/team/delete/:id", auth, deleteTeam);
router.get("/api/team/", getTeams);
router.get("/api/team/:id", getTeamById);
router.get("/api/team/search/:name", searchTeams);



module.exports = router;