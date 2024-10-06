import mongoose from "mongoose";

const log = mongoose.Schema(
  {
    log_id: { type: Number },
    operation_name: { type: String },
  },
  { timestamps: true }
);

const logSchema = new mongoose.model("logs", log);

export default logSchema;
