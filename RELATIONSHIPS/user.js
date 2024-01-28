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
  addresses: [
    {
      // id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "whiteHomes",
    addresses: [
      {
        location: "Mahabbob nagar colony",
        city: "Guntakal",
      },
    ],
  });
  user1.addresses.push({ location: "60 feet road", city: "Guntakal" });
  let res = await user1.save();
  console.log(res);
};

addUsers();
