const express = require('express');
const router = express.Router();

// Load Book model
const User = require('../../models/user');

// @route GET api/auth/register
// @description register user
// @access Public
router.post('/register', (req, res) => {
    // Validate the request body
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).send('Invalid request body');
        return;
    }

    // Check if the email address already exists
    let user = User.findOne({ email });
    if (user) {
        res.status(409).send('Email address already exists');
        return;
    }

    // Create a new user
    user = new User({
        username,
        email,
        password
    });

    // Save the user to the database
    user.save((err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        // Return the user object
        res.json(user);
    });
});


// @route GET api/login
// @description Login user
// @access Public
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findone({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "login sucess", user: user })
            } else {
                res.send({ message: "wrong credentials" })
            }
        } else {
            res.send("not register")
        }
    })
});

// @route GET api/auth/users
// @description Get all users
// @access Public
router.get('/users', (req, res) => {
    User.find()
        .then(users => res.json({
            status: true,
            data: users
        }))
        .catch(err => res.status(404).json({
            status: false,
            message: 'No user in database'
        }));
});


module.exports = router;