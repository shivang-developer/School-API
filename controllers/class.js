const Class = require("../model/class");

const getAllClasses = async (req, res) => {
  const { subject, teacher, classroom, students, period, time, sort, select } =
    req.query;
  const queryObject = {};
  if (subject) {
    queryObject.first_name = subject;
  }
  if (teacher) {
    queryObject.last_name = teacher;
  }
  if (classroom) {
    queryObject.classroom = classroom;
  }
  if (students) {
    queryObject.students = students;
  }
  if (period) {
    queryObject.period = period;
  }
  if (time) {
    queryObject.time = time;
  }
  let apiData = Class.find(queryObject).populate([
    "classroom",
    "teacher",
    "subject",
    "students",
  ]);
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

  const classData = await apiData;
  res.status(200).json({ classData });
};

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

const updateClass = async (req, res) => {
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
    Class.findByIdAndUpdate({ _id: _id }, updatingJson)
      .then((result) => {
        console.log("Success", result);
        res.status(200).json({ msg: "Class Record updated", oldData: result });
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
module.exports = { getAllClasses, addNewClass, updateClass };
