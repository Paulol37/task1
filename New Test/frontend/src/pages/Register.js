import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("User created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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

        .register-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .register-card {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          width: 350px;
          text-align: center;
          border-top: 6px solid #dc2626;
        }

        .company-logo {
          font-size: 1.4rem;
          font-weight: bold;
          color: #dc2626;
          margin-bottom: 1.2rem;
        }

        .register-title {
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: #111;
        }

        .register-input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .register-input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.25);
        }

        .register-button {
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

        .register-button:hover {
          background: #b91c1c;
        }

        .register-footer {
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #333;
        }

        .register-footer a {
          color: #dc2626;
          font-weight: 500;
          text-decoration: none;
        }

        .register-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Structure */}
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-card">
          <div className="company-logo">🔴 Register Page </div>

          {/* Name field */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="register-input"
            required
          />

          {/* Email field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="register-input"
            required
          />

          {/* Password field */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="register-input"
            required
          />

          <button type="submit" className="register-button">
            Register
          </button>

          <p className="register-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
