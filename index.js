const express = require("express");
const { configureLivereload } = require("./config/live"); // استيراد التكوينات من ملف config.js
var methodOverride = require("method-override");
const { connectToDatabase } = require("./config/database"); // استيراد اتصال قاعدة البيانات من ملف database.js
const route = require("./routes/route");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// livereload
configureLivereload(app);

// Connect to MongoDB using the function imported from database.js
connectToDatabase(app);

app.use(route);
