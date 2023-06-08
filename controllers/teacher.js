const Teacher = require("../model/teacher");

const getAllTeachers = async (req, res) => {
  const { first_name, last_name, title, level, subjects_taught, sort, select } =
    req.query;
  const queryObject = {};
  if (first_name) {
    queryObject.first_name = first_name;
  }
  if (last_name) {
    queryObject.last_name = last_name;
  }
  if (title) {
    queryObject.title = title;
  }
  if (level) {
    queryObject.level = level;
  }
  if (subjects_taught) {
    queryObject.subjects_taught = subjects_taught;
  }
  let apiData = Teacher.find(queryObject);
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

  const teacherData = await apiData;
  res.status(200).json({ teacherData });
};

const addNewTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    newTeacher
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Teacher Added", input: req.body });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        const { _message, message } = error;
        res.status(403).json({ error: { title: _message, message: message } });
      });
  } catch (error) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const updateTeacher = async (req, res) => {
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
    Teacher.findByIdAndUpdate({ _id: _id }, updatingJson)
      .then((result) => {
        console.log("Success", result);
        res
          .status(200)
          .json({ msg: "Teacher Record updated", oldData: result });
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

module.exports = { getAllTeachers, addNewTeacher };
