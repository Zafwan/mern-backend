const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, requireAuth } = require('./controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.get('/logout', logoutUser);

// Protected route example
router.get('/protected', requireAuth, (req, res) => {
    res.send('Protected route accessed successfully');
});

module.exports = router;
