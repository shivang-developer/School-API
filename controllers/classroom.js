const Classroom = require("../model/classroom");

const getAllClassrooms = async (req, res) => {};
const addNewClassroom = async (req, res) => {
  try {
    const newClassroom = new Classroom(req.body);
    newClassroom
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Classroom Added", input: req.body });
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

module.exports = { getAllClassrooms, addNewClassroom };
