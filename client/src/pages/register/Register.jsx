import { useRef } from "react"
import React from 'react'
import axios from "../../AxiosConfig"
import {Link, useNavigate } from "react-router-dom"
import classes from './register.module.css'
const Register = () => {
    const navigate = useNavigate();
    const userNameDom = useRef();
    const firstNameDom = useRef();
    const lastNameDom = useRef();
    const emailDom = useRef();
    const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Registered successfully, please login");
      navigate("/login"); // Use navigate here
      
    } catch (error) {
      alert("Something went wrong!");
      console.log(error.response);
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.left_container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h3>Join the Network</h3>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <div className={classes.input_group}>
            <input
              className={classes.input_field}
              ref={emailDom}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={classes.input_group}>
            <input
              className={classes.input_field}
              ref={firstNameDom}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              className={classes.input_field}
              ref={lastNameDom}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <div className={classes.input_group}>
            <input
              className={classes.input_field}
              ref={userNameDom}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className={classes.input_group}>
            <input
              className={classes.input_field}
              ref={passwordDom}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className={classes.submit_button}>
            Agree and Join
          </button>
        </form>
        <Link to="/login" className={classes.already_account}>
          Already have an account?
        </Link>
      </div>
      <div className={classes.right_container}>
        <Link to="/about" className={classes.about_link}>
          About
        </Link>
        <h1>Evangadi Networks Q&A</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Wheather you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <div className={classes.link}>
          <Link to="/aboutus" className={classes.link_bottom}>
            HOW IT WORKS HOW IT WORKS
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register