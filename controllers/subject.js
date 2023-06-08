const Subject = require("../model/subject");

const getAllSubjects = async (req, res) => {
  const { name, sort, select } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = name;
  }
  let apiData = Subject.find(queryObject);
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

  const subjectData = await apiData;
  res.status(200).json({ subjectData });
};

const addNewSubject = async (req, res) => {
  try {
    const newSubject = new Subject(req.body);
    newSubject
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Subject Added", input: req.body });
      })
      .catch((error) => {
        console.log("403 error", error);
        const { _message, message } = error;
        res.status(403).json({ error: { title: _message, message: message } });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const updateSubject = async (req, res) => {
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
    Subject.findByIdAndUpdate({ _id: _id }, updatingJson)
      .then((result) => {
        console.log("Success", result);
        res
          .status(200)
          .json({ msg: "Subject Record updated", oldData: result });
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

module.exports = { getAllSubjects, addNewSubject };
