import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

import bg from "../assets/auth-bg.jpeg";

import "../styles/auth.css";
import "../styles/admin.css";

export default function AdminRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
    agree: false
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

    setError("");
  };

  const pwMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.adminCode
    ) {
      return setError("All required fields must be filled.");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    if (!pwMatch) {
      return setError("Passwords do not match.");
    }

    if (!form.agree) {
      return setError("You must accept the terms and conditions.");
    }

    try {

      setLoading(true);

      await api.post("/auth/register", {
        ...form,
        role: "admin"
      });

      setSuccess("Admin account created! Redirecting to login...");

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);

    } catch (err) {

      setError(
        err.response?.data?.msg || "Registration failed."
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
            Join the Admin Team
          </h1>

          <p>
            Create your administrator account to manage civic reports,
            departments, officers, announcements, and community services.
          </p>

          <div className="admin-feature-list">

            <div className="admin-feature-item">
              ✅ Manage all civic reports
            </div>

            <div className="admin-feature-item">
              ✅ Assign officers & departments
            </div>

            <div className="admin-feature-item">
              ✅ Track complaint resolution
            </div>

            <div className="admin-feature-item">
              ✅ Post city announcements
            </div>

            <div className="admin-feature-item">
              ✅ Access analytics & logs
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
              🛡️ Admin Registration
            </div>

            <h2>Create Admin Account</h2>

            <p>
              Use your official admin invitation code
            </p>

          </div>

          {error && (
            <div className="admin-error-box">
              {error}
            </div>
          )}

          {success && (
            <div className="admin-success-box">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >

            {/* NAME + PHONE */}
            <div className="admin-fields-row">

              <div className="admin-field">

                <label>Full Name *</label>

                <div className="admin-input-wrap">

                  <span className="admin-input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Admin Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="admin-field">

                <label>Phone</label>

                <div className="admin-input-wrap">

                  <span className="admin-input-icon">
                    📱
                  </span>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            {/* EMAIL */}
            <div className="admin-field">

              <label>Email Address *</label>

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

            {/* PASSWORDS */}
            <div className="admin-fields-row">

              <div className="admin-field">

                <label>Password *</label>

                <div className="admin-input-wrap">

                  <span className="admin-input-icon">
                    🔒
                  </span>

                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
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

              <div className="admin-field">

                <label>Confirm Password *</label>

                <div className="admin-input-wrap">

                  <span className="admin-input-icon">
                    🔒
                  </span>

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </div>

            {/* PASSWORD MATCH */}
            {form.confirmPassword.length > 0 && (

              <p
                className={`admin-pw-hint ${
                  pwMatch ? "match" : "no-match"
                }`}
              >
                {pwMatch
                  ? "✔ Passwords match"
                  : "❌ Passwords do not match"}
              </p>

            )}

            {/* ADMIN CODE */}
            <div className="admin-field">

              <label>Admin Invitation Code *</label>

              <div className="admin-input-wrap">

                <span className="admin-input-icon">
                  🗝️
                </span>

                <input
                  type="text"
                  name="adminCode"
                  placeholder="Enter Admin Code"
                  value={form.adminCode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* CHECKBOX */}
            <div className="admin-checkbox">

              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />

              <label htmlFor="agree">
                I agree to the{" "}
                <a href="#">Terms & Conditions</a>{" "}
                and{" "}
                <a href="#">Privacy Policy</a>
              </label>

            </div>

            {/* BUTTON */}
            <button
              className="admin-submit-btn"
              type="submit"
              disabled={
                loading ||
                !form.agree ||
                (
                  form.confirmPassword.length > 0 &&
                  !pwMatch
                )
              }
            >

              {loading ? (
                <span className="admin-spinner"></span>
              ) : (
                <>
                  Create Admin Account →
                </>
              )}

            </button>

          </form>

          <div className="admin-divider">
            <span>or</span>
          </div>

          <div className="admin-switch-link">
            Already have an account?{" "}
            <Link to="/admin/login">
              Sign in
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}