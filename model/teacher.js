// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create teacher schema
const teacherSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "year must be provided"],
  },
  Level: {
    type: Number,
    required: true,
  },
  subjects_taught: {
    type: String,
    enum: {
      values: ["English", "Math", "Computer", "Science"],
      message: `{VALUE} is not supported`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
