import React from "react";
import styles from "./splash.module.css";
import icon from "../../assets/ICON.svg";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.splashContainer}>
      <img src={icon} alt="Logo" className={styles.logoImg} />

      <button className={styles.loginBtn} onClick={() => navigate("/login")}>
        LOG IN
      </button>


      {/* Clique em SIGN UP leva para tela de cadastro */}
      <p className={styles.signupText} onClick={() => navigate("/register")}>
        SIGN UP
      </p>
    </div>
  );
};

export default SplashScreen;
