import React, { useState, useEffect, useRef } from "react";
import { FaHandPointRight } from "react-icons/fa";
import axios from "../../../AxiosConfig";
import { useParams } from "react-router-dom";
import classes from "../detailQuestion/detailQuestion.module.css";

function DetailQuestion() {
  const [question, setQuestion] = useState(null);
  const [values, setValues] = useState();
  const { questionid } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {}, [question]);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    console.log("/questions/question ", questionid);
    async function QuestionDetails() {
      try {
        const response = await axios.get(`/questions/question/${questionid}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setQuestion(response.data.question);
      } catch (error) {
        console.error("Error with question details:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      }
    }

    QuestionDetails();
  }, [questionid]);

  // Ref for the textarea
  const answerName = useRef();

  async function sendAnswer(e) {
    e.preventDefault();
    const answerValue = answerName.current.value;

    if (!answerValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post(
        `/answers/all-answer/${questionid}`,
        {
          answer: answerValue,
          questionid: questionid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // const token = localStorage.getItem("token");
      alert("Your answer has been posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      //empty answer
      answerName.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllAnswer() {
    try {
      const respond = await axios.get(`/answers/all-answer/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setValues(respond.data);
    } catch (error) {
      console.error("Error with question details:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  }
  useEffect(() => {
    getAllAnswer();
  }, []);
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Question</h1>
      {question ? (
        <div className={classes.question_section}>
          <div className={classes.question_title}>
            <FaHandPointRight className={classes.icon} />
            <span>{question.tittle}</span>
          </div>

          <div className={classes.question_description}>
            {question.description}
          </div>
        </div>
      ) : (
        <p className={classes.loading}>Loading question details...</p>
      )}
      <div className={classes.question_title}>Answer from Community</div>
      <br />
      <div className={classes.answers_section}>
        {values?.map((value, i) => (
          <div key={i} className={classes.answer}>
            <div className={classes.answer_username}>{value.username}</div>
            <div className={classes.answer_text}> {value.answer}</div>
          </div>
          //  <div>{values.}</div>
        ))}
      </div>
      <form onSubmit={sendAnswer} className={classes.answer_form}>
        <textarea
          ref={answerName}
          rows="5"
          cols="90"
          placeholder="Enter your answer"
          className={classes.textarea}
        ></textarea>
        <br />
        <button type="submit" className={classes.submit_button}>
          Post Answer
        </button>
      </form>
    </div>
  );
}

export default DetailQuestion;
