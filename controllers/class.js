const Class = require("../model/class");

const getAllClasses = async (req, res) => {};
const addNewClass = async (req, res) => {
    const { name } = req.body;
    try {
      const newClass = new Class(req.body);
      newClass
        .save()
        .then(() => {
          console.log("Success");
          res.status(200).json({ msg: "New Class Added", input: req.body });
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
  
  module.exports = { getAllClasses, addNewClass };
  