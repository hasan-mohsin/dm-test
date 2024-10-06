// database.js (your file)
import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", true);

async function connect() {
  return await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error(new Error(err));
      process.exit(1);
    });
}

export default connect;
