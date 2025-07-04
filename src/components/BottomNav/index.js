import React from "react";
import styles from "./bottomnav.module.css";
import { Link, useLocation } from "react-router-dom";
import dashWhite from "../../assets/dash-white.svg";
import dashGray from "../../assets/dash-gray.svg";

import courseWhite from "../../assets/courses-white.svg";
import courseGray from "../../assets/courses-gray.svg";

import profileWhite from "../../assets/profile-white.svg";
import profileGray from "../../assets/profile-gray.svg";


const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className={styles.bottomNav}>
      <Link to="/dashboard" className={styles.navBtn}>
        <img
          src={location.pathname === "/dashboard" ? dashWhite : dashGray}
          alt="Dashboard icon"
          className={styles.iconnav}
        />
      </Link>

      <Link to="/courses" className={styles.navBtn}>
        <img
          src={location.pathname === "/courses" ? courseWhite : courseGray}
          alt="Courses icon"
          className={styles.iconnav}
        />
      </Link>

      <Link to="/profile" className={styles.navBtn}>
        <img
          src={location.pathname === "/profile" ? profileWhite : profileGray}
          alt="Profile icon"
          className={styles.iconnav}
        />
      </Link>
    </nav>
  );
};

export default BottomNav;
