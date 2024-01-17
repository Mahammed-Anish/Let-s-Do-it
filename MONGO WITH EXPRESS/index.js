const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", (req, res) => {
  res.send("success");
});

// INDEX ROUTE
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  // res.send("working");
  res.render("index.ejs", { chats });
});

// NEW ROUTE
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE CHAT
app.post("/chats", (req, res) => {
  let { from: formFrom, to: formTo, msg: formMsg } = req.body;
  // console.log(formFrom, formMsg, formTo);

  let chat = new Chat({
    from: formFrom,
    to: formTo,
    msg: formMsg,
    createdAt: new Date(),
  });

  chat
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("Msg Sent");
  res.redirect("/chats");
});

// EDIT ROUTE
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let info = await Chat.findById(id);
  // console.log(info);
  res.render("edit.ejs", { info });
});

// UPDATE ROUTE
app.put("/chats/:id", async (req, res) => {
  // res.send("success");
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  // console.log(newMsg);
  await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { new: true, runValidators: true }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(msg);
  // we can also implement updated date and time
  res.redirect("/chats");
});

// DELETE ROUTE
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
