const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  year_group: {
    type: Number,
    required: [true, "year must be provided"],
  },
  date_of_birth: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  school_team: {
    type: String,
    enum: {
      values: ["Ruby", "Saphire", "Emerald", "Amber"],
      message: `{VALUE} is not supported`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Class", classSchema);
