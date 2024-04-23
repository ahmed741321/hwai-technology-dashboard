const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    Age: Number,
    Country: String,
    Gender: String,
  },
  { timestamps: true, get: (time) => time.toDateString() }
);

// Create a model based on that schema
const User = mongoose.model("user", userSchema);

module.exports = User;
