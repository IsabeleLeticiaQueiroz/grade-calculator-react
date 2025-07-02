// src/components/Login/index.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("TRYING LOGIN WITH:", form);
    // Aqui vai o fetch ou axios para login
  };

  return (
  <div className={styles.loginContainer}>
    <div className={styles.contentWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.loginBtn}>
          LOG IN
        </button>
      </form>

      <p className={styles.registerPrompt}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.registerLink}>
          Click here
        </Link>
      </p>
    </div>
  </div>
);
};

export default Login;
