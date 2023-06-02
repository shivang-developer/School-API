const express = require("express");
const router = express.Router();

const { getAllClasses, addNewClass } = require("../controllers/class");

router.route("/").get(getAllClasses);
router.route("/").post(addNewClass);

module.exports = router;
