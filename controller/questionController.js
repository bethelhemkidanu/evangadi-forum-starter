const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");

// Function to handle posting a new question
async function postQuestion(req, res) {
  const { tittle, description, tag } = req.body;

  // Generate a unique question ID
  const questionid = uuidv4();

  // Check if required fields are provided
  if (!tittle || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }

  try {
    // Insert the new question into the database
    const result = await dbConnection.query(
      "INSERT INTO questions (questionid, userid, tittle, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, req.user.userid, tittle, description, tag]
    );

    // Return a success response with the generated question ID
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "your question has posted", questionid });
  } catch (error) {
    console.log(error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Question ID already exists" });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong" });
  }
}

// Function to handle  a specific question by its ID
async function getQuestion(req, res) {
  // Extract the question ID from request parameters
  const { questionid } = req.params;

  try {
    const [question] = await dbConnection.query("SELECT tittle, description from questions where questionid = ?  ",[questionid]
      // "SELECT questions.question , users.username FROM questions INNER JOIN users ON questions.userid = users.userid WHERE questionid = ?",
      // [questionid]
      
//       `SELECT 
//     questions.questionid, 
//     questions.title, 
//     questions.description, 
//     users.username,
//     questions.id
// FROM 
//     questions
// INNER JOIN 
//     users ON questions.userid = users.userid
  
//     ORDER BY 
//     questions.id DESC;
//     `
    );

    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    // Return the found question
    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error("Error retrieving question:", error.message);

    // Handle any errors during the query
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

// Function to handle all questions
async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      // "SELECT questionid, tittle, username INNER JOIN users ON FROM questions"
      "SELECT q.questionid, q.tittle, u.username FROM questions q JOIN users u ON q.userid = u.userid"
    );

    // Return the list of questions
    return res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error.message);

    // Handle any errors during the query
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

module.exports = { postQuestion, getQuestion, getAllQuestions };
