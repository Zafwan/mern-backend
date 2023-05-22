const express = require('express');
const router = express.Router();

// Load Book model
const User = require('../../models/user');

// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
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

// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({
            status: true,
            data: user
        }))
        .catch(err => res.status(404).json({
            status: false,
            message: 'No User found'
        }));
});

// @route GET api/users/:id
// @description Update user
// @access Public
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({
            status: true,
            message: 'Updated successfully'
        }))
        .catch(err =>
            res.status(400).json({
                status: false,
                message: 'Unable to update this user'
            })
        );
});

// @route GET api/users/:id
// @description Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
        .then(user => res.json({
            status: true,
            message: 'User deleted successfully'
        }))
        .catch(err => res.status(404).json({
            status: false,
            message: 'User not found'
        }));
});


module.exports = router;