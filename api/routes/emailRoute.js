const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const { sendEmail } = require("../controllers/emailController");

app.use(cors());

// using the APIs

router.post("/", sendEmail);

module.exports = router;