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

      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      console.log("ADMIN LOGIN:", res.data.user);

      // 🔥 ROLE CHECK (IMPORTANT FIX)
      if (res.data.user.role !== "admin") {
        setError("Access denied. Admin only login.");
        setLoading(false);
        return;
      }

      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin/dashboard");

    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.msg ||
        err.response?.data?.message ||
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
            🛡️ CivicSnap
          </div>

          <p className="admin-brand-sub">
            Admin Panel
          </p>

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
                  onClick={() => setShowPass(!showPass)}
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
                <>Sign In as Admin →</>
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