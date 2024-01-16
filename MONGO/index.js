const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// const user1 = new User({
//   name: "Anish",
//   email: "anishk2710@gmail.com",
//   age: 22,
// });

// user1.save();

// user1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.insertMany([
//   { name: "Eve", email: "eve@yahoo.com", age: 24 },
//   { name: "Tony", email: "tony@gmail.com", age: 20 },
// ]).then((res) => {
//   console.log(res);
// });

// User.find({})
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.find({ age: { $gt: 20 } })
//   .then((res) => {
//     console.log(res);
// console.log(res[0]);
// console.log(res[0].name);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.findOne({ age: { $gt: 20 } })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.findById("65a6d2885eb56ee620900393")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.updateOne({ name: "Tony" }, { age: 21 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.updateMany({ age: { $lt: 22 } }, { age: 20 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.findByIdAndUpdate("65a6d2885eb56ee620900393", { age: 23 }, { new: true })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.findOneAndUpdate({ name: "Anish" }, { age: 22 }, { new: true })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.deleteOne({ name: "Tony" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
