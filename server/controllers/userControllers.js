const asyncHandler = require('express-async-handler');
const { User } = require('../models/index');
const signToken = require('../utils/auth');

// Register a new user
// POST /api/user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: signToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('User not created');
    }
});

// Authorize user
// POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isCorrectPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: signToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

// Get/search all users
// GET /api/user?search=
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i'} }
          ]
        }
      : {};
    const users = (await User.find(keyword)).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };