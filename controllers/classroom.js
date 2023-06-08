const Classroom = require("../model/classroom");

const getAllClassrooms = async (req, res) => {
  const { facality, capacity, room_type, sort, select } = req.query;
  const queryObject = {};
  if (facality) {
    queryObject.facality = facality;
  }
  if (capacity) {
    queryObject.capacity = capacity;
  }
  if (room_type) {
    queryObject.room_type = room_type;
  }
  let apiData = Classroom.find(queryObject);
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

  const classroomData = await apiData;
  res.status(200).json({ classroomData });
};

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
        const { _message, message } = error;
        res.status(403).json({ error: { title: _message, message: message } });
      });
  } catch (error) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const updateClassroom = async (req, res) => {
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
    Classroom.findByIdAndUpdate({ _id: _id }, updatingJson)
      .then((result) => {
        console.log("Success", result);
        res
          .status(200)
          .json({ msg: "Classroom Record updated", oldData: result });
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

module.exports = { getAllClassrooms, addNewClassroom };
