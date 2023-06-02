const express = require("express");
const router = express.Router();

const { getAllSubjects, addNewSubject } = require("../controllers/subject");

router.route("/").get(getAllSubjects);
router.route("/").post(addNewSubject);

module.exports = router;
