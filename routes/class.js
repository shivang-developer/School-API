const express = require("express");
const router = express.Router();

const {
  getAllClasses,
  addNewClass,
  updateClass,
} = require("../controllers/class");

router.route("/").get(getAllClasses);
router.route("/add").post(addNewClass);
router.route("/update").put(updateClass);

module.exports = router;
