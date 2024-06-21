import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { FaRegUserCircle, FaAngleRight } from "react-icons/fa";
import Highlighter from "react-highlight-words";


const Home = () => {
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const [val, setVal] = useState(""); // State to hold the search query
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results
  const [question, setQuestion] = useState([]);
  const token = localStorage.getItem("token");
  // const {deleteQue, setDeleteQue} = useState(false)

  // Function to handle navigation to question details
  function moreDetail(questionid) {
    navigate(`/question/${questionid}`);
  }

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(data);
      setQuestion(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [setQuestion]);
  useEffect(() => {}, [question]);

  // Function to handle the search request
  const searchQuestion = async () => {
    if (val.trim() === "") {
      setSearchResults(question); // Reset search results to all questions if search query is empty
      return;
    }

    try {
      const { data } = await axios.post(
        "/questions/quesearch",
        { stringQuery: val },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setSearchResults(data); // Update the state with the search results
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setVal(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults(question); // Reset search results to all questions if search query is empty
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    searchQuestion(); // Trigger the search
  };
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
      {/* Search */}
      <form onSubmit={handleSubmit} className={classes.search_container}>
        <input
          type="text"
          value={val}
          onChange={handleInputChange}
          placeholder="Search for a question..."
          className={classes.search_input}
        />
        <button type="submit" className={classes.search_button}>
          Search
        </button>
      </form>

      <div className={classes.questions}>
        {/* {question.map((q) => ( */}
        {searchResults.length > 0 ? (
          searchResults.map((q) => (
            <div
              onClick={() => moreDetail(q.questionid)}
              key={q.questionid}
              className={classes.questionItem}
            >
              <div>
                <FaRegUserCircle className={classes.user_icon} />

                <p>{q.username}</p>
              </div>
              <Highlighter
                highlightClassName={classes.highlight}
                searchWords={[val]}
                autoEscape={true}
                textToHighlight={q.tittle}
              />

              <div className={classes.title}>{q.tittle}</div>
              <div className={classes.icon}>
                <FaAngleRight />
              </div>

              <br />
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </section>
  );
};

export default Home;
