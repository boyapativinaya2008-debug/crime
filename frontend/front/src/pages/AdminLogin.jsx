import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";

import "../styles/auth.css";
import "../styles/admin.css";

import bg from "../assets/auth-bg.jpeg";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.email || !form.password) {
      return setError("All fields are required.");
    }

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login",
        {
          ...form,
          role: "admin"
        }
      );

      console.log("ADMIN LOGIN:", res.data.user);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/admin/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.msg ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="admin-auth-page">

      {/* LEFT PANEL */}
      <div
        className="admin-auth-left"
        style={{
          backgroundImage: `linear-gradient(rgba(30,58,138,0.78), rgba(37,99,235,0.78)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >

        <div className="admin-brand">

          <div className="admin-logo">

            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >

              <rect
                width="32"
                height="32"
                rx="8"
                fill="white"
                fillOpacity="0.15"
              />

              <path
                d="M16 4L6 10V22L16 28L26 22V10L16 4Z"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />

              <circle
                cx="16"
                cy="16"
                r="4"
                fill="white"
              />

            </svg>

            <span>CivicSnap</span>

          </div>

          <p className="admin-brand-sub">
            Admin Panel
          </p>

        </div>

        <div className="admin-auth-hero">

          <h1>
            Manage. Monitor.
            <br />
            Make a Difference.
          </h1>

          <p>
            The CivicSnap admin panel gives you full
            control over civic reports, departments,
            officers, announcements, and community
            management.
          </p>

          <div className="admin-feature-list">

            <div className="admin-feature-item">
              ✅ Manage civic complaints
            </div>

            <div className="admin-feature-item">
              ✅ Assign officers & departments
            </div>

            <div className="admin-feature-item">
              ✅ Track resolution progress
            </div>

            <div className="admin-feature-item">
              ✅ Post city announcements
            </div>

            <div className="admin-feature-item">
              ✅ Access analytics & reports
            </div>

          </div>

        </div>

        <div className="admin-auth-footer-text">
          © 2026 CivicSnap. Secure. Transparent. Connected.
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="admin-auth-right">

        <div className="admin-auth-card">

          <div className="admin-card-header">

            <div className="admin-badge">
              🛡️ Admin Access
            </div>

            <h2>Welcome Back</h2>

            <p>
              Sign in to your administrator account
            </p>

          </div>

          {error && (
            <div className="admin-error-box">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >

            {/* EMAIL */}
            <div className="admin-field">

              <label>Email Address</label>

              <div className="admin-input-wrap">

                <span className="admin-input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="admin@civicsnap.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="admin-field">

              <label>Password</label>

              <div className="admin-input-wrap">

                <span className="admin-input-icon">
                  🔒
                </span>

                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="admin-eye"
                  onClick={() =>
                    setShowPass(!showPass)
                  }
                >
                  {showPass ? "🙈" : "👁️"}
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <button
              className="admin-submit-btn"
              type="submit"
              disabled={loading}
            >

              {loading ? (

                <span className="admin-spinner"></span>

              ) : (

                <>
                  Sign In as Admin →
                </>

              )}

            </button>

          </form>

          <div className="admin-divider">
            <span>or</span>
          </div>

          <div className="admin-switch-link">

            Don't have an admin account?{" "}

            <Link to="/admin/register">
              Register here
            </Link>

          </div>

          <div
            className="admin-switch-link"
            style={{ marginTop: "8px" }}
          >

            Are you a user?{" "}

            <Link to="/login">
              User Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}