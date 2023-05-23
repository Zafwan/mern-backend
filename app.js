require('dotenv').config();
const session = require('express-session')
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session) // add this package to store the user session id automatically on mongodb

// routes
const books = require('./routes/api/books');
const loginRegister = require('./routes/api/auth/loginRegister');
const users = require('./routes/api/users');

const app = express();
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs

// Connect Database
connectDB();

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions',
})

//session
app.use(
    session({
        secret: 'a1s2d3f4g5h6',
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: mongoDBstore,
        cookie: {
            maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
            sameSite: false,
            secure: false, // to turn on just in production
        },
        resave: true,
        saveUninitialized: false,
    })
)

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/books', books);
app.use('/api/auth', loginRegister);
app.use('/api/users', users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));