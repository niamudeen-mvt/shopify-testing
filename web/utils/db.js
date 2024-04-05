import mongoose from "mongoose";
import colors from 'colors'


const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection to DB".bgGreen);
  } catch (error) {
    console.log("database connection failed");
    process.exit(0);
  }
};

export default connectDb;
