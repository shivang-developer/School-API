const Student = require("../model/student");

const getAllStudents = async (req, res) => {};
const addNewStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    newStudent
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Student Added", input: req.body });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        res.status(403).json({ error: error });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { getAllStudents, addNewStudent };
