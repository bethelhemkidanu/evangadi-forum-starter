import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import { AppState } from "../../App";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useContext(AppState);
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    setIsAuthenticated(false);

    navigate("/login");
  };

  const renderAuthLink = () => {
    if (location.pathname === "/login") {
      return (
        <Link to="/register" className={classes.link}>
          Register
        </Link>
      );
    } else if (location.pathname === "/register") {
      return (
        <Link to="/login" className={classes.link}>
          Sign In
        </Link>
      );
    } else if (user) {
      return (
        <button
          onClick={handleLogout}
          className={`${classes.link} ${classes.button}`}
        >
          Sign Out
        </button>
      );
    } else {
      return (
        <Link to="/login" className={classes.link}>
          Sign In
        </Link>
      );
    }
  };
  return (
    <section className={classes.flex}>
      <div className={classes.left_side}>
        <Link to={"/"}>
          <img
            src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
            alt="evangadi logo"
          />
        </Link>
      </div>
      <div className={classes.right_side}>
        <Link to={"/"}>Home</Link>
        <Link to={"/howitworks"}>How it Work</Link>
        {renderAuthLink()}
      </div>
    </section>
  );
}

export default Header;
