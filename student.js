const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());
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
// app.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// );
//fetching data to server in formdata format
function work(event) {
  event.preventDefault();
  console.log("ya its work");
}
app.use(bodyparser.json());

app.post("http://locolhost:3500/data", (req, res) => {
  res.send("request arrived");
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
});

app.listen(port, () => {
  console.log("server on and running");
});
