const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  facality: {
    type: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  room_type: {
    type: String,
    enum: {
      values: ["Science Class", "Biology Lab", "Computer Lab", "Sports Class"],
      message: `{VALUE} is not supported`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Classroom", classroomSchema);
