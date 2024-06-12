import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { FaRegUserCircle, FaAngleRight } from "react-icons/fa";

const Home = () => {
  const { user } = useContext(AppState);
  const navigate = useNavigate();

  // Function to handle navigation to question details
  function moreDetail(questionid) {
    navigate(`/question/${questionid}`);
  }

  const [question, setQuestion] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data } = await axios.get("/questions/all-questions", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(data);
        setQuestion(data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchQuestions();
  }, [setQuestion]);

  return (
    <section className={classes.container_wrapper}>
      <div className={classes.flex}>
        <div>
          <Link to={"/question"}> Ask Question</Link>
        </div>
        <div className={classes.container}>
          <h2>Welcome: {user.username}</h2>
        </div>
      </div>

      <div className={classes.questions}>
        {question.map((q) => (
          <div
            onClick={() => moreDetail(q.questionid)}
            key={q.questionid}
            className={classes.questionItem}
          >
            <div>
              <FaRegUserCircle className={classes.user_icon} />

              <p>{q.username}</p>
            </div>
            <div className={classes.title}>{q.tittle}</div>
            <div className={classes.icon}>
              <FaAngleRight />
            </div>
            {/* answer count */}
            <br />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
