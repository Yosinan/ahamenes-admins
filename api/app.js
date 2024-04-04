const express = require("express");
const start = require('./database');
const teamRouter = require("./routes/teamRoute");
const statusRouter = require("./routes/status");
const eventRouter = require("./routes/eventRoute");
const emailRouter = require("./routes/emailRoute");
const errorHandler = require('./middlewares/errorHandler').default;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

// start database connection
start();

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("static"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/team', teamRouter);
app.use('/status', statusRouter);
app.use('/api/send-email', emailRouter);
app.use('/api/event', eventRouter);

// Error handler
// app.use(errorHandler);

module.exports = app;