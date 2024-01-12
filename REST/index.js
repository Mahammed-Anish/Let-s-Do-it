const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Mahammed Anish",
    content: "Btech final year student",
  },
  {
    id: uuidv4(),
    username: "cse",
    content: "Computer Science and Engineering",
  },
  {
    id: uuidv4(),
    username: "coder",
    content: "Aspiring developer and programmer",
  },
];

app.get("/posts", (req, res) => {
  // res.send("server is working well");
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  // console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // res.send("post request is working");
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let post = posts.find((p) => id === p.id);
  // console.log(post);
  // res.send("request working");
  res.render("show", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  // console.log(id);
  // console.log(newContent);
  let post = posts.find((p) => id === p.id);
  // console.log(post);
  post.content = newContent;
  // res.send("patch request is working");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  // res.send();
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
