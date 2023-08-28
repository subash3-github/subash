const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());
const path = require("path");
const port = 3500;
const mongo_url =
  "mongodb+srv://subash:subash482@sensor.v5itlge.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(
    "mongodb+srv://subash:subash482@sensor.v5itlge.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
const typ = new mongoose.Schema({
  Name: String,
  rollno: String,
  dob: String,
  dept: String,
  year: String,
});

const datamod = new mongoose.model("model", typ);
app.use(bodyparser.json());
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "student.html"));
});
app.get("/viewdata", (req, res) => {
  res.sendFile(path.join(__dirname, "retrival.html"));
});

app.post("/data", (req, res) => {
  console.log("request arrived");
  const database = new datamod({
    Name: req.body.name,
    rollno: req.body.rno,
    dob: req.body.dob,
    dept: req.body.dept,
    year: req.body.year,
  });
  database
    .save()
    .then(() => {
      console.log("data pushed successfully");
    })
    .catch((e) => {
      console.log(e);
    });
  res.send("request arrived");
});
app.post("/retdata", () => {
  console.log("request arrived");
  data
    .find({
      rno: req.body.rno,
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
  if (!req.body.rno) {
    res.send("no matches found");
  }
});

app.listen(port, () => {
  console.log("server on and running");
});
