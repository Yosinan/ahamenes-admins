const express = require("express");
const start = require('./database');
const teamRouter = require("./routes/teamRoute");
const statusRouter = require("./routes/status");
const eventRouter = require("./routes/eventRoute");
const emailRouter = require("./routes/emailRoute");
const errorHandler = require('./middlewares/errorHandler').default;
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

// start database connection
start();


app.use(express.static("static"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', teamRouter);
app.use('/', statusRouter);
app.use('/', emailRouter);
app.use('/api/event', eventRouter);

// Error handler
// app.use(errorHandler);

module.exports = app;