const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  facality: {
    type: String,
  },
  capacity: {
    //how many can sit inside it
    type: Number,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
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
