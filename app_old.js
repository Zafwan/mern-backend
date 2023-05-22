const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Bodyparser middleware
app.use(express.json());

// Import book router
const bookRouter = require('./routes/api/books');

// Define routes
app.use('/api/books', bookRouter);

// Default route
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));