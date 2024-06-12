import {useRef} from "react"
import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import axios from '../../AxiosConfig'
import classes from './login.module.css'
const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("Please provide required information");
      return;
    }

    try {
       const { data } = await axios.post("/users/login", {
        
        email: emailValue,
        password: passwordValue,
      });
      alert("login successfully");
      localStorage.setItem('token', data.token)
      navigate("/"); 
      console.log(data)
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section className={classes.main_container}>
      <div className={classes.login_container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <br />
          <h4>Login to your account</h4>

          <p>
            Don't have account 
            <Link className={classes.link_color}> Create a new account</Link>
          </p>
          <div className={classes.input_group}>
            <input ref={emailDom} type="email" placeholder="email" />
          </div>
          <br />
          <div className={classes.input_group}>
            <input ref={passwordDom} type="password" placeholder="password" />
          </div>
          <button type="submit" className={classes.login_button}>
            Login
          </button>
        </form>
        <Link to={"/register"} className={classes.link_color}>
          {" "}
          Create an account
        </Link>
      </div>
      <div className={classes.right_container}>
        <Link
          to={"/about"}
          style={{ color: "#f2602be8" }}
          className={classes.about_link}
        >
          About
        </Link>
        <h2>Evangadi Networks Q&A </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={classes.link}>
          <Link to={"/aboutus"} className={classes.link_bottom}>
            HOW IT WORKS
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login