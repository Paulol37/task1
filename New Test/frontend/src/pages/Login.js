import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/employees");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* Black-Red-White Theme CSS */}
      <style>{`
        body {
          margin: 0;
          background: linear-gradient(135deg, #111, #1f1f1f);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .login-card {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          width: 350px;
          text-align: center;
          border-top: 6px solid #dc2626; /* red accent */
        }

        .company-logo {
          font-size: 1.4rem;
          font-weight: bold;
          color: #dc2626;
          margin-bottom: 1.2rem;
        }

        .login-title {
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: #111;
        }

        .login-input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .login-input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.25);
        }

        .login-button {
          width: 100%;
          padding: 0.8rem;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .login-button:hover {
          background: #b91c1c;
        }

        .login-footer {
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #333;
        }

        .login-footer a {
          color: #dc2626;
          font-weight: 500;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* HTML Structure */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-card">
          <div className="company-logo">🔴 Login Page </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Sign In
          </button>
          <p className="login-footer">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
