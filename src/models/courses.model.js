import mongoose from "mongoose";

const course = mongoose.Schema(
  {
    course_name: { type: String },
    course_code: { type: String },
    gpa_requered: { type: Number },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.model("courses", course);

export default courseSchema;
