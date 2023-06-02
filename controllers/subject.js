const Subject = require("../model/subject");

const getAllSubjects = async (req, res) => {};
const addNewSubject = async (req, res) => {
  try {
    const newSubject = new Product(req.body);
    newSubject
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Subject Added", input: req.body });
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

module.exports = { getAllSubjects, addNewSubject };
