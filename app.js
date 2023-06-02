require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
var bodyParser = require("body-parser");

// importing Routes
const student_routes = require("./routes/student");
const class_routes = require("./routes/class");
const classroom_routes = require("./routes/classroom");
const subject_routes = require("./routes/subject");
const teacher_routes = require("./routes/teacher");

// defining PORT
const PORT = process.env.PORT || 5002;
var jsonParser = bodyParser.json(); // create application/json parser

//Root Url :: To see if connection is alive or not
app.get("/", (req, res) => {
  res.send("Hi i am live");
});

// middleware or to set router
app.use("/api/student", jsonParser, student_routes);
app.use("/api/class", jsonParser, class_routes);
app.use("/api/classroom", jsonParser, classroom_routes);
app.use("/api/teacher", jsonParser, teacher_routes);
app.use("/api/subject", jsonParser, subject_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes i am connected`);
    });
  } catch (error) {
    console.log("Error in catch block");
    console.log(error);
  }
};

start();
