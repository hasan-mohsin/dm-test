import mongoose, { Types } from "mongoose";

const student = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId }],
    GPA: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const studentSchema = new mongoose.model("students", student);
export default studentSchema;
