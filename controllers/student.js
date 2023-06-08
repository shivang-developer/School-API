const Student = require("../model/student");
const mongoose = require("mongoose");

const getAllStudents = async (req, res) => {
  const { first_name, last_name, year_group, sort, select } = req.query;
  const queryObject = {};
  if (first_name) {
    queryObject.first_name = first_name;
  }
  if (last_name) {
    queryObject.last_name = last_name;
  }
  if (year_group) {
    queryObject.year_group = year_group;
  }
  let apiData = Student.find(queryObject);
  if (sort) {
    let sortfix = sort.split(",").join(" ");
    apiData = apiData.sort(sortfix);
  }
  if (select) {
    let selectfix = select.split(",").join(" ");
    apiData = apiData.select(selectfix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit; // Formula for Pagination.
  apiData.skip(skip).limit(limit);

  const studentData = await apiData;
  res.status(200).json({ studentData });
};

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
        const { _message, message } = error;
        res.status(403).json({ error: { title: _message, message: message } });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const deleteStudent = async (req, res) => {
  try {
    Student.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(req.query.id),
    })
      .then((result) => {
        console.log("Success", result);
        res.status(200).json({ msg: result });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        const { _message, message } = error;
        res.status(403).json({ error: { title: _message, message: message } });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const updateStudent = async (req, res) => {
  try {
    const { _id } = req.body;
    const updatingJson = req.body;
    // Remove id from the updatingJson
    Object.keys(updatingJson).forEach(function (key) {
      console.log(updatingJson[key]);
      if (updatingJson[key] === _id) {
        delete updatingJson[key];
      }
    });
    Student.findByIdAndUpdate({ _id: _id }, updatingJson)
      .then((result) => {
        console.log("Success", result);
        res
          .status(200)
          .json({ msg: "Student Record updated", oldData: result });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        const { _message, message } = error;
        res.status(403).json({ error: { title: _message, message: message } });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
module.exports = {
  getAllStudents,
  addNewStudent,
  deleteStudent,
  updateStudent,
};
