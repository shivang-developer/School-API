const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  addNewStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student");

router.route("/").get(getAllStudents);
router.route("/add").post(addNewStudent);
router.route("/delete").get(deleteStudent);
router.route("/update").put(updateStudent);

module.exports = router;
