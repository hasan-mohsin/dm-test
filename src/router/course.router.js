import express from "express";
import courseSchema from "../models/courses.model.js";

const router = express.Router();
const routeName = "course";

router.get(`/${routeName}`, async (req, res) => {
  const Course = await courseSchema.find();
  res.json(Course);
});

router.post(`/${routeName}`, async (req, res) => {
  try {
    const newCourse = new courseSchema(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
