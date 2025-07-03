const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    console.log("not connected");
    }
};

conn();