import axios from "axios";
import React, { useState } from "react";       // importou React e useState     // importou Link do react-router-dom
import styles from "./login.module.css";       // importou os estilos CSS module
import { Link, useNavigate } from "react-router-dom";



const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  try {
    const response = await axios.post(
      "https://grade-calculator-api-z8km.onrender.com/api/auth/login",
      form
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify({
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
    }));

    navigate("/dashboard"); // redireciona aqui

  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.error || "Erro ao fazer login. Tente novamente."
    );
  }
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

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
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
