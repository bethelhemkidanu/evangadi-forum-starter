import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { FaRegUserCircle, FaAngleRight } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Home = () => {
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const [val, setVal] = useState(""); // State to hold the search query
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results
  const token = localStorage.getItem("token");
  // const {deleteQue, setDeleteQue} = useState(false)

  // Function to handle navigation to question details
  function moreDetail(questionid) {
    navigate(`/question/${questionid}`);
  }

  const [question, setQuestion] = useState([]);
  const fetchQuestions = async () => {
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
  };
  useEffect(() => {
    fetchQuestions();
  }, [setQuestion]);
  useEffect(() => {}, [question]);

  /// delete
  
  // const deleteQuestions = async (questionid) => {
  //   try {
  //     const { data } = await axios
  //       .delete(`/questions/delete/${questionid}`, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       })
  //       .then((res) => {
  //         fetchQuestions();
  //       })
  //       .catch((err) => {
  //         console.log("this catch ", err);
  //       });
  //     console.log(data);
  //     setQuestion((prevQuestions) =>
  //       prevQuestions.filter((q) => q.questionid !== questionid)
  //     );
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  
  /// search
  // async function searchQuestion(){
  //   try{
  //     const info =await axios.post(`/questions/quesearch`,{
  //       stringQuery:val
  //     },{ headers:{
  //       Authorization: 'Bearer ' + token,}
  //     })
  //     setSearch(info.data)
  //   }
  //   catch (error){
  //     console.log(error);
  //   }
  // }
  // Function to handle the search request
  // const searchQuestion = async () => {
  //   try {
  //     const info = await axios.post(
  //       "/questions/quesearch",
  //       { stringQuery: val },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     setSearchResults(info.data); // Update the state with the search results
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // Handle input change
  // const handleInputChange = (e) => {
  //   setVal(e.target.value);
  // };

  // // Handle form submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   searchQuestion(); // Trigger the search
  // };
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
      {/* search */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={val}
          onChange={handleInputChange}
          placeholder="Search for a question..."
        />
        <button type="submit">Search</button>
      </form> */}
      {/* <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div> */}
      {/* search  */}
      {/* {searchResults.length > 0 ? ( */}
      {/* {searchResults.map((q) => ( */}

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
            {/* {q.username == user.username && (
              <div onClick={(e) => e.stopPropagation()}>
                <FaTrashAlt
                  onClick={() => deleteQuestions(q.questionid)}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "20px",
                  }}
                />
              </div>
            )} */}
            {/* answer count */}
            <br />
          </div>
        ))}
      </div>
      {/* ) : (
         <p>No results found</p>
      )} */}
      <br />
      {/* <FaTrashAlt onClick={deleteQuestions} /> */}
    </section>
  );
};

export default Home;
