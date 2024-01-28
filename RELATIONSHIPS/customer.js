const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const userSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let cust1 = new User({
    name: "Anish",
  });

  let order1 = await Order.findOne({ item: "Chocolate" });
  let order2 = await Order.findOne({ item: "chips" });
  // console.log(order1);

  cust1.orders.push(order1);
  cust1.orders.push(order2);
  let res = await cust1.save();
  console.log(res);
};

addUsers();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     {
//       item: "samosa",
//       price: 15,
//     },
//     {
//       item: "chips",
//       price: 10,
//     },
//     {
//       item: "Chocolate",
//       price: 40,
//     },
//   ]);
//   console.log(res);
// };

// addOrders();
