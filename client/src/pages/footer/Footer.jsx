import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import classes from './footer.module.css'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <section className={classes.footer_wrapper}>
      <div>
        <img
          src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
          alt="evangadi logo"
        />
        <div className={classes.link}>
          <FaFacebook />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>
      <div>
        <h3>Useful Link</h3>
        <Link>How it Works</Link>
        <Link>Terms of Service</Link>
        <Link>Privacy policy</Link>
      </div>
      <div>
        <h3>Contact Info</h3>
        <Link to={"/https://www.evangadi.com/"}>Evangadi Networks</Link>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </section>
  );
}

export default Footer