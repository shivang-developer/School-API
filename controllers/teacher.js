const Teacher = require("../model/teacher");

const getAllTeachers = async (req, res) => {};
const addNewTeacher = async (req, res) => {
  try {
    const newTeacher = new Product(req.body);
    newTeacher
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Teacher Added", input: req.body });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        res.status(403).json({ error: error });
      });
  } catch (error) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { getAllTeachers, addNewTeacher };
