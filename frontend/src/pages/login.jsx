import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const navigateBasedOnRole = (role) => {
    const normalizedRole = role?.toUpperCase();
    switch (normalizedRole) {
      case "CUSTOMER":
        navigate("/restaurants_user", { replace: true });
        break;
      case "RESTAURANT_ADMIN":
        navigate("/restaurants", { replace: true });
        break;
      default:
        console.warn("Unknown role:", role);
        message.warning("Your account type doesn't have an assigned dashboard");
        navigate("/", { replace: true });
    }
  };

  const fetchAndNavigate = async (userId) => {
    try {
      const userResponse = await axios.get(`/api/auth/users/${userId}`, {
        withCredentials: true
      });

      if (userResponse.data?.role) {
        navigateBasedOnRole(userResponse.data.role);
      } else {
        throw new Error("User role not found in profile");
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      message.error("Couldn't load your profile information");
      navigate("/", { replace: true });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      message.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
          withCredentials: true
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const userObj = data.user?.id ? data.user : data.id ? data : null;

        if (userObj && userObj.id) {
          localStorage.setItem("currentUser", JSON.stringify(userObj));
          rememberMe
            ? localStorage.setItem("rememberedEmail", email)
            : localStorage.removeItem("rememberedEmail");

          message.success("Login Successful!");

          if (userObj.role) {
            navigateBasedOnRole(userObj.role);
          } else {
            await fetchAndNavigate(userObj.id);
          }
          return;
        }

        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errMsg = axios.isAxiosError(error)
        ? error.response?.data?.message || error.response?.statusText || "Login failed"
        : error.message;
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="bg-light vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#6c757d">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
          </svg>
        </div>
        <h4 className="text-center mb-3">Restaurant Owner Login</h4>
        <p className="text-center text-muted mb-4">Sign in to manage your restaurant</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#6c757d">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="owner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#6c757d">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                minLength={6}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon path={showPassword ? mdiEyeOff : mdiEye} size={1} />
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Don't have an account? <a href="/signup" className="text-decoration-none">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
