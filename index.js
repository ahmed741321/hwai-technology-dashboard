const express = require("express");
var methodOverride = require("method-override");
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

const { configureLivereload } = require("./config/live");
const { connectToDatabase } = require("./config/database");
const { authenticateToken } = require("./middleware/authenticateToken");

const user_route = require("./routes/user");
const main = require("./routes/main");
const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// livereload
configureLivereload(app);

// Connect to MongoDB using the function imported from database.js
connectToDatabase(app);

app.use(cors());

// تهيئة جلسات Express
app.use(session({
    secret: 'Hwai Technology',
    resave: false,
    saveUninitialized: false
}));

// تهيئة Connect-Flash
app.use(flash());
app.use("/user", authenticateToken, user_route);
app.use(main);
