const authController = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
authController.post('/register', async(req, res) => {
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting) {
            throw new Error("Email is already registered");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ ...req.body, password: hashedPassword})
        const { password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '4h'})

        return res.status(201).json({ newUser, token})
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

// login
authController.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            throw new Error("Wrong Credentials");
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass) {
            throw new Error("Wrong Credentials");

        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '4h'})
        const {password, ...others} = user._doc

        return res.status(200).json({others, password})

    } catch (err) {
        return res.status(500).json(err.message);
    }
})

module.exports = authController;