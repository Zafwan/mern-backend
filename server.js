const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to express api." });
});

// open mongoose connection and connect to MongoDB
const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");

// Create a connection to MongoDB
mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a role model
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

// Create a role model instance
const Role = mongoose.model("Role", RoleSchema);

// Initialize the roles collection
async function initial() {
    // Get an estimate of the number of documents in the roles collection
    const count = await Role.estimatedDocumentCount();

    // If there are no documents in the collection, create three new roles
    if (count === 0) {
        await Role.create({
            name: "user",
        });

        await Role.create({
            name: "moderator",
        });

        await Role.create({
            name: "admin",
        });
    }
}

// Start the connection
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB.");
    initial();
});

// Handle connection errors
mongoose.connection.on("error", err => {
    console.error("Connection error", err);
    process.exit();
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});