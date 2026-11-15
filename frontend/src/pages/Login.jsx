
import React, { useState } from "react";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User
} from "lucide-react";

const API_URL = "http://127.0.0.1:5000";

function Login({ onLogin }) {

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    if (isRegister) {

      const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

      if (!namePattern.test(name.trim())) {
        setError("Full Name should contain only letters!");
        return;
      }

      const passwordPattern =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Z].{7,}$/;

      if (!passwordPattern.test(password)) {
        setError(
          "Password must start with a capital letter and contain 8 characters, one number and one special character."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
    }

    setLoading(true);

    try {

      const endpoint = isRegister ? "/register" : "/login";

      const payload = isRegister
        ? {
            name: name.trim(),
            email: email.trim(),
            password: password
          }
        : {
            email: email.trim(),
            password: password
          };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      if (isRegister) {

        alert(data.message);

        setIsRegister(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

      } else {

        alert("Welcome " + data.user.name + "!");

        localStorage.setItem(
          "careerAIUser",
          JSON.stringify(data.user)
        );

        onLogin();

      }

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <Brain size={42} />
          <h1>CareerAI</h1>
        </div>

        <h2>
          {isRegister ? "Create Account" : "Welcome Back!"}
        </h2>

        <p>
          {isRegister
            ? "Start your career journey with CareerAI."
            : "Sign in to continue your career journey."}
        </p>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <>
              <label>Full Name</label>

              <div className="login-input">
                <User size={19} />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                        .replace(/[^A-Za-z ]/g, "")
                        .replace(/\s{2,}/g, " ")
                    )
                  }
                  required
                />
              </div>

              <small className="validation-hint">
                Only English letters are allowed.
              </small>
            </>
          )}

          <label>Email Address</label>

          <div className="login-input">
            <Mail size={19} />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>

          <div className="login-input">
            <Lock size={19} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword
                ? <EyeOff size={19} />
                : <Eye size={19} />}
            </span>
          </div>

          {isRegister && (
            <>
              <small className="validation-hint">
                Password requirements:
                <br />
                • First letter must be Capital
                <br />
                • Minimum 8 characters
                <br />
                • At least one number
                <br />
                • At least one special character
              </small>

              <label>Confirm Password</label>

              <div className="login-input">
                <Lock size={19} />

                <input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  minLength={8}
                />

                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </span>
              </div>
            </>
          )}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isRegister
                ? "Create Account"
                : "Login"}
          </button>

        </form>

        <div className="register-option">

          <p>
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setError("");
            }}
          >
            {isRegister ? "Login Here" : "Create Account"}
          </button>

        </div>

        <p className="login-footer">
          Build Your Future With AI
        </p>

      </div>

    </div>
  );
}

export default Login;
