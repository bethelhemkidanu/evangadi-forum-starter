import React, { useRef } from "react";
import axios from "../../AxiosConfig";
import classes from './question.module.css'
function Question() {
  const tittleName = useRef();
  const descriptionName = useRef();

  async function sendQuestion(e) {
    e.preventDefault();
    const tittleValue = tittleName.current.value;
    const descriptionValue = descriptionName.current.value;

    if (!tittleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      
      const token = localStorage.getItem("token"); 

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send the request with the authorization header
      await axios.post(
        "/questions/question",
        {
          tittle: tittleValue,
          description: descriptionValue,
        },
        config
      );

      alert("Your question has been posted");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.steps_container}>
        <h3 className={classes.steps_heading}>
          Steps to write a good question
        </h3>
        <ul className={classes.steps_list}>
          <li>Summarize your question</li>
          <li>Describe your question</li>
          <li>Review your question</li>
        </ul>
      </div>
      <form onSubmit={sendQuestion} className={classes.form}>
        <h2 className={classes.form_heading}>Post Your Question</h2>
        <input
          ref={tittleName}
          type="text"
          size="97"
          placeholder="Enter title"
          className={classes.input_field}
        />

        <textarea
          ref={descriptionName}
          rows="5"
          cols="90"
          placeholder="Enter description"
          className={classes.textarea}
        ></textarea>

        <button type="submit" className={classes.submit_button}>
          Post Question
        </button>
      </form>
    </section>
  );
}

export default Question;
