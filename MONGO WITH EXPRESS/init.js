// This file is created and used to check our database if it is working fine with the help of some sample data. so it will be used or executed only once to verify our db with sample data.

const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let chats = [
  {
    from: "C",
    to: "D",
    msg: "Hlo",
    createdAt: new Date(), //UTC time will be set
  },
  {
    from: "E",
    to: "F",
    msg: "How r u?",
    createdAt: new Date(), //UTC time will be set
  },
];

Chat.insertMany(chats);
