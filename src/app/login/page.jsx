"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Login successful");
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  function onRegister() {
    router.push("/register");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Smart Board</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Login
        </button>
        <p className={styles.register} onClick={onRegister}>Register</p>
      </form>
    </div>
  );
}
