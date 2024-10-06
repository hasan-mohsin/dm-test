import express from "express";
import studentSchema from "../models/students.model.js";
import logSchema from "../models/logs.model.js";
import { Server } from 'socket.io';
// import io from "../../index.js"

const router = express.Router();

const routeName = "student";
router.get(`/${routeName}`, async (req, res) => {
  const student = await studentSchema.find();
  // io.on("connection", (socket) => {
  //   socket.emit("hello", "world");
  // });
  // socket.on("hello", (arg) => {
  //   console.log(arg); // world
  // });
  
  res.json(student);
});

router.post(`/${routeName}`, async (req, res) => {
  try {
    const newStudent = new studentSchema(req.body);
    const savedStudent = await newStudent.save();
    // const log = new logSchema()
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(`/${routeName}`, async (req, res) => {
  let data = req.body;

  try {
    const updatedStudent = await studentSchema.findByIdAndUpdate(
      req?.query?._id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete(`/${routeName}`, async (req, res) => {
  try {
    const deletedStudent = await studentSchema.findByIdAndDelete({
      _id: req?.query?._id,
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(`/${routeName}/course-enroll`, async (req, res) => {
  const data = req?.body;
  try {
    const student = await studentSchema.findById(data?.userId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.courses.includes(data?.courseId)) {
      return res.status(400).json({ message: "Course already added" });
    }

    const updatedStudent = await studentSchema.findByIdAndUpdate(
      data?.userId,
      { $push: { courses: data?.courseId } },
      { new: true }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(`/${routeName}/remove-course`, async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const student = await studentSchema.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.courses.includes(courseId)) {
      return res
        .status(404)
        .json({ message: "Course not found in student's courses" });
    }

    const updatedStudent = await studentSchema.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } },
      { new: true }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
