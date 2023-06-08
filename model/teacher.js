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
  },
  level: {
    type: Number,
    required: true,
    enum: {
      values: [1, 2, 3, 4, 5],
      message: `{VALUE} is not supported`,
    },
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
