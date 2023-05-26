const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
