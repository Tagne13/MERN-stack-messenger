const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const signToken = require('../utils/auth');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, pic } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        username,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            pic: user.pic,
            token: signToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('User not created');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isCorrectPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            pic: user.pic,
            token: signToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

module.exports = { registerUser, authUser };