const dbConnection = require("../db/dbConfig");

async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
 const userid = req.user.userid;
  // Check if required information is provided
  if ( !questionid || !answer) {
    return res
      .status(400)
      .json({ msg: "Please provide all required information" });
  }

  try {
    //  const { questionid } = req.params;
    const questionid = req.params.questionid;
    // Insert the answer into the database
    const result = await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );


    return res.status(201).json({ msg: "Your answer has been posted" });
  } catch (error) {
    console.error("Error posting answer:", error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

async function getAnswer(req, res) {
  const { questionid } = req.params;

  try {
    // Query the database to get answers for the specified question
    const [answers] = await dbConnection.query(
      "SELECT answers.answer , users.username FROM answers INNER JOIN users ON answers.userid = users.userid WHERE questionid =?",
      [questionid]
    );

   console.log(answers)
    return res.status(200).send( answers );
  } catch (error) {
    console.error("Error retrieving answers:", error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}


module.exports = { postAnswer, getAnswer };
