const express = require("express");
const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
  // console.log("Accepted");
  let { user, paswd } = req.params;
  res.send(`Standard GET Response. Welcome ${user}`);
});

app.post("/register", (req, res) => {
  // console.log(req.body);
  let { user, paswd } = req.body;
  res.send(`Standard POST Response. welcome ${user}`);
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
