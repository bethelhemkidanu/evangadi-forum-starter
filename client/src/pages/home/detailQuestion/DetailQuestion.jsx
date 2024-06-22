import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";
import { FaHandPointRight } from "react-icons/fa";
import axios from "../../../AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./detailQuestion.module.css";
import { AppState } from "../../../App";
import { FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import ConfirmModal from "./ConfirmModal";
function DetailQuestion() {
  const { user } = useContext(AppState);

  const [question, setQuestion] = useState(null);
  const [responses, setResponses] = useState();
  const [isloading, setIsloading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [answerIdOnEdit, setAnswerIdOnEdit] = useState(null);
  const [isEditModeQuestion, setIsEditModeQuestion] = useState(false);
  const [questionIdOnEdit, setQuestionIdOnEdit] = useState(null);
  const [tittleValue, setTittleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const tittleName = useRef();
  const descriptionName = useRef();
  const { questionid } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [deleteAnswerId, setDeleteAnswerId] = useState(null);
  const [message, setMessage] = useState("");
  const [render, forceUpdate] = useReducer((x) => x + 1);
  const token = localStorage.getItem("token");
  useEffect(() => {}, [question]);
  // useEffect(() => {
  //   // const token = localStorage.getItem("token");
  //   console.log("/questions/question ", questionid);
  //   async function QuestionDetails() {
  //     try {
  //       const response = await axios.get(`/questions/question/${questionid}`, {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setQuestion(response.data.question);
  //     } catch (error) {
  //       console.error("Error with question details:", error);
  //       if (error.response) {
  //         console.error("Response data:", error.response.data);
  //         console.error("Response status:", error.response.status);
  //       }
  //     }
  //   }

  //   QuestionDetails();
  // }, [questionid]);

  // Ref for the textarea

  async function QuestionDetails() {
    try {
      const response = await axios.get(`/questions/question/${questionid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setQuestion(response.data.question);
      // setResponses(response.data.responses);
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    QuestionDetails();
  }, [setQuestion]);

  const answerName = useRef();

  async function sendAnswer(e) {
    e.preventDefault();
    const answerValue = answerName.current.value;

    if (!answerValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      setIsloading(true);
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
      // forceUpdate();
      setMessage("Your answer has been posted");

      // Update the responses state with the new answer
      setResponses((prevResponses) => [...prevResponses]);

      //empty answer
      answerName.current.value = "";
      setIsloading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  }

  async function getAllAnswer() {
    try {
      const respond = await axios.get(`/answers/all-answer/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setResponses(respond.data);
      console.log(respond.data);
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
  // [isloading, isEditMode, answerIdOnEdit, responses];

  // delete answer and question conformation

  const confirmDeleteQuestion = (questionid) => {
    setDeleteQuestionId(questionid);
    setShowConfirmModal(true);
  };

  const handleConfirmDeleteQuestion = async () => {
    setShowConfirmModal(false);
    if (deleteQuestionId) {
      await deleteQuestions(deleteQuestionId);
      setDeleteQuestionId(null);
    }
  };

  const confirmDeleteAnswer = (answerid) => {
    setDeleteAnswerId(answerid);
    setShowConfirmModal(true);
  };

  const handleConfirmDeleteAnswer = async () => {
    setShowConfirmModal(false);
    if (deleteAnswerId) {
      await deleteAnswer(deleteAnswerId);
      setDeleteAnswerId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setDeleteQuestionId(null);
    setDeleteAnswerId(null);
  };

  const deleteQuestions = async (questionid) => {
    try {
      const { data } = await axios.delete(`/questions/delete/${questionid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(data);
      setNotification("You have deleted your question");
      setTimeout(() => {
        setQuestion((prevQuestions) =>
          prevQuestions.filter((q) => q.questionid !== questionid)
        );
        navigate("/");
      }, 1000); // Navigate after 2 seconds
    } catch (error) {
      console.log("Error deleting question:", error.response || error.message);
    }
  };

  const deleteAnswer = async (answerid) => {
    console.log("answerid==>", answerid);
    try {
      const { data } = await axios.delete(`answers/answer/${answerid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setNotification("You have deleted your answer");
      setTimeout(() => {
        setResponses((prevResponses) =>
          prevResponses.filter((response) => response.answerid !== answerid)
        );
      }, 1000); //  delay
    } catch (error) {
      console.error("Error deleting answer: ", error.response || error.message);
    }
  };

  //edit
  const editAnswer = async (answerid, answer) => {
    setIsEditMode(true);
    setAnswerIdOnEdit(answerid);
    answerName.current.value = answer;
  };
  async function updateAnswer(e) {
    e.preventDefault();
    const answerValue = answerName.current.value;

    if (!answerValue) {
      // alert("Please provide all required information");
      setNotification("Please provide all required information");
      return;
    }

    try {
      setIsloading(true);
      await axios.post(
        `/answers/update-answer/${answerIdOnEdit}`,
        {
          answer: answerValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
       setNotification("Your answer has been updated");
      // alert("Your answer has been updated");

      //empty answer
      answerName.current.value = "";
      setIsloading(false);
      setIsEditMode(false);
      // setAnswerIdOnEdit(null)
       window.location.reload();
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  }

  // edit question

  const editQuestion = async (questionid, tittle, description) => {
    setIsEditModeQuestion(true);
    setQuestionIdOnEdit(questionid);
    setTittleValue(tittle);
    setDescriptionValue(description);
    // tittleName.current.value = tittle;
    // descriptionName.current.value = description;
  };

  // update question //
  // //////////////// //
  ///
  const handleClickOutside = (event) => {
    if (event.target.classList.contains(classes.editQuestion)) {
      setIsEditModeQuestion(false);
    }
  };
  // update question //
  useEffect(() => {
    if (isEditModeQuestion) {
      tittleName.current.value = tittleValue;
      descriptionName.current.value = descriptionValue;
    }
  }, [isEditModeQuestion, tittleValue, descriptionValue]);

  const updateQuestion = async (e) => {
    e.preventDefault();

    if (!tittleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      setIsloading(true);
      await axios.post(
        `/questions/update-question/${questionIdOnEdit}`,
        {
          tittle: tittleValue,
          description: descriptionValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // alert("Your question has been updated");
    setNotification("Your answer has been updated");
      // Reset form
      setTittleValue("");
      setDescriptionValue("");
      setIsloading(false);
      setIsEditModeQuestion(false);
      // Refresh question details
     
      setQuestion({
        ...question,
        tittle: tittleValue,
        description: descriptionValue,
        
      })
   
    } catch (error) {
      console.error(error);
      setIsloading(false);
    }
  };
  // delete notification
  const handleClickOut = (event) => {
    if (event.target.classList.contains(classes.notification_main)) {
      setNotification(false);
    }
  };
  return (
    <div className={classes.container}>
      {notification && (
        <div onClick={handleClickOut} className={classes.notification_main}>
          <div className={classes.notification}>{notification}</div>
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          message={
            deleteQuestionId
              ? "Are you sure you want to delete this question?"
              : "Are you sure you want to delete this answer?"
          }
          onConfirm={
            deleteQuestionId
              ? handleConfirmDeleteQuestion
              : handleConfirmDeleteAnswer
          }
          onCancel={handleCancelDelete}
        />
      )}

      <h1 className={classes.heading}>Question</h1>
      {question ? (
        <div className={classes.question_section}>
          <div>
            <div className={classes.question_title}>
              <FaHandPointRight className={classes.icon} />
              <span>{question?.tittle}</span>
            </div>

            <div className={classes.question_description}>
              {question?.description}
            </div>
          </div>
          {/* {question.username == user.username && ( */}
          {/* <div onClick={(e) => e.stopPropagation()}>
            <FaTrashAlt
              onClick={() => delete question.questionid}
              style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
            /> */}
          <div className={classes.delete_icon}>
            {question?.username == user?.username && (
              <div onClick={(e) => e.stopPropagation()}>
                <FaTrashAlt
                  onClick={() => confirmDeleteQuestion(question.questionid)}
                  // onClick={() => confirmDeleteQuestion(question.questionid)}
                  style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                />
                <CiEdit
                  onClick={() =>
                    editQuestion(
                      question.questionid,
                      question.tittle,
                      question.description
                    )
                  }
                  style={{ cursor: "pointer", color: "gray", fontSize: "25px" }}
                />
              </div>
            )}
          </div>

          {/* </div> */}
          {/* )} */}
        </div>
      ) : (
        <p className={classes.loading}>Loading question details...</p>
      )}
      {/* update question  */}
      {/* {isEditModeQuestion && (
        <form onSubmit={updateQuestion} className={classes.form}>
          <h2 className={classes.form_heading}>Update Your Question</h2>
          <input
            ref={tittleName}
            type="text"
            size="97"
            placeholder="Enter title"
            className={classes.input_field}
            value={tittleValue}
            onChange={(e) => setTittleValue(e.target.value)}
          />
          <br />
          <br />
          <textarea
            ref={descriptionName}
            rows="5"
            cols="90"
            placeholder="Enter description"
            className={classes.textarea}
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className={classes.submit_button}
            disabled={isloading}
          >
            {isloading ? "Updating..." : "update Question"}
          </button>
        </form>
      )} */}
      {isEditModeQuestion && (
        <div className={classes.editQuestion} onClick={handleClickOutside}>
          {" "}
          <form onSubmit={updateQuestion} className={classes.formedit}>
            <h2 className={classes.form_title}>Update Your Question</h2>
            <input
              ref={tittleName}
              type="text"
              placeholder="Title"
              className={classes.tittle}
              value={tittleValue}
              onChange={(e) => setTittleValue(e.target.value)}
            />
            <textarea
              ref={descriptionName}
              placeholder="Enter description"
              className={classes.Question_Des}
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className={classes.button}
              disabled={isloading}
            >
              {isloading ? "Updating..." : "Post Question"}
            </button>
          </form>
        </div>
      )}
      <br />
      <br />
      <div className={classes.question_title}>Answer from Community</div>
      <br />
      <div className={classes.answers_section}>
        {responses?.map((value, i) => (
          <div key={i} className={classes.answer}>
            <div>
              <div className={classes.answer_username}>{value.username}</div>
              <br />

              <div className={classes.answer_text}> {value.answer}</div>
            </div>
            <div>
              {value.username == user.username && (
                <div onClick={(e) => e.stopPropagation()}>
                  <FaTrashAlt
                    onClick={() => confirmDeleteAnswer(value.answerid)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                    }}
                  />
                  <CiEdit
                    onClick={() => editAnswer(value.answerid, value.answer)}
                    style={{
                      cursor: "pointer",
                      color: "gray",
                      fontSize: "20px",
                    }}
                  />
                  <br />
                </div>
              )}
            </div>
          </div>

          //  <div>{values.}</div>
        ))}
      </div>
      {message && <div className="message">{message}</div>}
      <form
        onSubmit={isEditMode ? updateAnswer : sendAnswer}
        className={classes.answer_form}
      >
        <textarea
          ref={answerName}
          rows="5"
          cols="90"
          placeholder="Enter your answer"
          className={classes.textarea}
        ></textarea>
        <br />
        <button type="submit" className={classes.submit_button}>
          {isloading
            ? "posting..."
            : isEditMode
            ? " Update Answer"
            : "Post Answer"}
        </button>
      </form>
    </div>
  );
}

export default DetailQuestion;
