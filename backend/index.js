const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const authController = require('./controllers/authController.js');
const eventController = require('./controllers/eventController');
const cors = require('cors');
const uploadController = require('./controllers/uploadController.js');

const app = express();

// mongodb connect
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, () => console.log('MongoDB has been started sucessfully'));

//routes & middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/auth", authController);
app.use("/event", eventController);
app.use("upload", uploadController);



// starting server
app.listen(process.env.PORT, () => console.log('Server running on Port'));