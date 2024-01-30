import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.CON_STR || "";
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
export default connectDB;
