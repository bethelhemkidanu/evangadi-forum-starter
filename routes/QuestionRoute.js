// QuestionRoute.js
const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getQuestion,
  getAllQuestions,
} = require("../controller/questionController");

// POST request to create a new question
router.post("/question", postQuestion);

// GET request to get a specific question
router.get("/question/:questionid", getQuestion);

// GET request to get all questions
router.get("/all-questions", getAllQuestions);

module.exports = router;
