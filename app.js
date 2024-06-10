require('dotenv').config()
const express = require('express');
const app = express();
const port = 5500

const cors = require('cors')
app.use(cors())
// db connection
const dbConnection = require('./db/dbConfig')
// user routes middleware  file

const userRoutes = require("./routes/userRoute")

// question routes middleware  file
const questionsRoute = require("./routes/QuestionRoute")
// answer routes middleware  file
const answersRoute = require("./routes/answerRoute")


// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");

// json middleware to extract  json data 
app.use(express.json())
//  user routes middleware
app.use("/api/users" , userRoutes);

//  questions routes middleware
app.use("/api/questions", authMiddleware, questionsRoute);

// answers routes middleware
app.use("/api/answers", authMiddleware, answersRoute);


// app.get("/api/data/combined", async (req, res) => {
//   const query = `SELECT 
//     questions.questionid, 
//     questions.tittle, 
//     questions.description, 
//     users.username,
//     questions.id
// FROM 
//     questions
// INNER JOIN 
//     users ON questions.userid = users.userid
  
//     ORDER BY 
//     questions.id DESC;
//     `;

//   try {
//     const [results] = await dbConnection.query(query);
//     res.send(results);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

async function start(){
  try {
  const result = await dbConnection.execute("select 'test'")
  app.listen(port)
  console.log("database connection etablished")
  console.log(`listening on ${port}`)

} catch (error) {
  console.log(error.message)
}
}
start()

