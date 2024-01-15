const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const port = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "anish@123ANISH",
});

let getRandomUser = () => {
  // return {
  // id: faker.string.uuid(),
  // username: faker.internet.userName(),
  // email: faker.internet.email(),
  // avatar: faker.image.avatar(),
  // password: faker.internet.password(),
  // birthdate: faker.date.birthdate(),
  // registeredAt: faker.date.past(),
  // };

  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// let q = "INSERT INTO user(id,username,email,password) VALUES (?, ?, ?, ?)";
// let q = "INSERT INTO user(id,username,email,password) VALUES ?";
// let user = ["101", "aaa", "a123@gmail.com", "12345"];
// let users = [
//   ["102", "bbb", "b123@gmail.com", "6789"],
//   ["103", "ccc", "c123@gmail.com", "156237"],
// ];

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   // console.log(getRandomUser());
//   data.push(getRandomUser());
// }

// try {
//   // connection.query("SHOW TABLES", (err, result) => {
//   // connection.query(q, user, (err, result) => {
//   // connection.query(q, [users], (err, result) => {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();

// console.log(getRandomUser());

// HOME ROUTE
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      console.log(result[0]["COUNT(*)"]);
      // res.send(result);
      // res.send(result[0]);
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs", { count });
      // res.send(result[0]["COUNT(*)"]);
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// SHOW ROUTE
app.get("/user", (req, res) => {
  // res.send("success");
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      // res.send(result);
      res.render("showusers", { result });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// EDIT ROUTE
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result[0]);
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
  // console.log(q);
  // res.render("edit.ejs");
});

// UPDATE (DB) ROUTE
app.patch("/user/:id", (req, res) => {
  // res.send("updated");
  let { id } = req.params;
  let { password: formpass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result[0]);
      let user = result[0];
      if (formpass != user.password) {
        res.send("Wrong Password");
      } else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          // res.send(result);
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// ADD NEW USER
// CREATE ROUTE
app.get("/user/new", (req, res) => {
  // res.send("success");
  res.render("newuser.ejs");
});

app.post("/user", (req, res) => {
  // res.send("Success");
  let { username: newName, email: newEmail, password: newPassword } = req.body;
  // console.log(newName, newEmail, newPassword);
  let v4 = uuidv4();
  let q = `INSERT INTO user(id,username,email,password) VALUES ?`;
  let data = [[v4, newName, newEmail, newPassword]];
  try {
    connection.query(q, [data], (err, result) => {
      if (err) throw err;
      // console.log(result);
      // res.send("success");
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
  console.log(q);
  // res.send("success");
});

// DELETE or DESTROY ROUTE
app.delete("/user/:id", (req, res) => {
  // res.send("success");
  let { id } = req.params;
  let q = `DELETE FROM user WHERE id = ?`;
  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

app.listen(port, (req, res) => {
  console.log("server is running on port", port);
});
