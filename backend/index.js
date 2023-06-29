const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const authController = require('./controllers/authController.js');
const eventController = require('./controllers/eventController');
const cors = require('cors');
const uploadController = require('./controllers/uploadController.js');
const bodyParser = require('body-parser');
const userController = require('./controllers/userCotroller.js');
const commentController = require('./controllers/commentController.js');


const app = express();

app.get('/', (req, res) => {
    res.send('hello world')
  })

// mongodb connect
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, () => console.log('MongoDB has been started sucessfully'));
app.use('/images', express.static('public/images'));

//routes & middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/auth", authController);
app.use("/event", eventController);
app.use("/upload", uploadController);
app.use("/user", userController)
app.use("/comment", commentController)
app.use(bodyParser.json());

// app.use('/', express.static('dist'))



// starting server
const port = process.env.PORT || 7000;
app.listen(port, () => console.log("Server has been started"));