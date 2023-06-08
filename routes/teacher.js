const express = require("express");
const router = express.Router();

const { getAllTeachers, addNewTeacher } = require("../controllers/teacher");

router.route("/").get(getAllTeachers);
router.route("/add").post(addNewTeacher);

module.exports = router;
