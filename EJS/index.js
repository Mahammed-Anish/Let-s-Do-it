const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  // res.send("this is home");
  // res.render("home.ejs");
  res.render("home");
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/rolldice", (req, res) => {
  // res.send("hello");
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice", { diceVal });
  // res.render("rolldice", { num : diceVal });
  // res.render("rolldice", { diceVal : diceVal });
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  // const followers = ["aa", "bb", "cc", "dd"];
  // console.log(username);
  // res.render("instagram", { username, followers });
  const instaData = require("./data.json");
  // console.log(instaData);
  const data = instaData[username];
  // console.log(data);
  // res.render("instagram", { instaData });
  if (data) {
    res.render("instagram", { data });
  } else {
    res.render("error");
  }
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
