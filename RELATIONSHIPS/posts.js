const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
  // let user1 = new User({
  //   username: "Aaa",
  //   email: "abc@gmail.com",
  // });

  let user = await User.findOne({ username: "Aaa" });

  let post1 = new Post({
    content: "Hello World",
    likes: 10,
  });

  // post1.user = user1;
  post1.user = user;

  // await user1.save();
  await post1.save();
};

addData();

// const del = async () => {
//   await User.findByIdAndDelete("");
//   await Post.findByIdAndDelete("");
// };

// del();

const getData = async () => {
  let res = await Post.findOne({}).populate("user");
  // let res = await Post.findOne({}).populate("user", "username");
  console.log(res);
};

getData();
