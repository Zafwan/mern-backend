const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Load User model
const UserSchema = require('../../../models/user');

// @route POST api/auth/register
// @description register user
// @access Public
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password)
        return res.status(400).json({
            status: false,
            message: 'Username, Password and Email are required'
        })

    if (password.length < 8) {
        return res
            .status(400)
            .json({
                status: false,
                message: 'Password should be at least 8 characters long'
            })
    }

    const user = await UserSchema.findOne({ email }) // finding user in db
    if (user) return res.status(400).json({
        status: false,
        message: 'User already exists'
    })

    const newUser = new UserSchema({ username, email, password })
    // hasing the password
    bcrypt.hash(password, 7, async (err, hash) => {
        if (err)
            return res.status(400).json({
                status: false,
                message: 'Error while saving the password'
            })

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes)
            return res.status(200).json({
                status: true,
                message: 'Successfully registered'
            })
    })
})

// @route POST api/auth/login
// @description login user
// @access Public
router.post(`/login`, async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({
            status: false,
            message: 'Something missing'
        })
    }

    const user = await UserSchema.findOne({ email: email }) // finding user in db
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found'
        })
    }

    // comparing the password with the saved hash-password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword) {
        return res
            .status(200)
            .json({
                status: true,
                message: 'You have logged in successfully'
            })
    } else {
        return res.status(400).json({
            status: false,
            message: 'Invalid credential'
        })
    }
})


module.exports = router