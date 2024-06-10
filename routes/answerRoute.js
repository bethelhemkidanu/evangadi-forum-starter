const express = require("express");
const router = express.Router();

const {postAnswer, getAnswer} = require("../controller/answerController")

// Route for posting answers to a specific question
router.post("/all-answer/:questionid", postAnswer);



// GET request to retrieve answers for a specific question
router.get("/all-answer/:questionid", getAnswer);

module.exports = router;
