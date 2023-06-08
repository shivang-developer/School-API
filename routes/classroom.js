const express = require("express");
const router = express.Router();

const { getAllClassrooms, addNewClassroom } = require("../controllers/classroom");

router.route("/").get(getAllClassrooms);
router.route("/add").post(addNewClassroom);

module.exports = router;
