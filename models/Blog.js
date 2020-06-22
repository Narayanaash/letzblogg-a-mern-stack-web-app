const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Blog = mongoose.model("blog", BlogSchema);
