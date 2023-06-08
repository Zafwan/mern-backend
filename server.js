const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const PORT = process.env.PORT || 5000;

// API routes
const routes = require('./routes');
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the default route');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
