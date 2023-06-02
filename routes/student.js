const express = require("express");
const router = express.Router();

const { getAllStudents, addNewStudent } = require("../controllers/student");

router.route("/").get(getAllStudents);
router.route("/").post(addNewStudent);

module.exports = router;
