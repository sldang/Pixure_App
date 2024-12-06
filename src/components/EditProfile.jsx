import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.zipCode ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill out all required fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Simulate API call for updating profile
    console.log("Profile updated:", formData);
    toast.success("Profile updated successfully!");
    setTimeout(() => navigate("/profile"), 2000);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Edit Profile</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* First Name */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="firstName">
              First Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="lastName">
              Last Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your last name"
            />
          </div>

          {/* Username */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">
              Username <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>

          {/* Zip Code */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="zipCode">
              Zip Code <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your zip code"
            />
          </div>

          {/* Email Address */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email Address <span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password <span style={styles.required}>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">
              Confirm Password <span style={styles.required}>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm your password"
            />
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>
              Save Changes
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

// Styles for the component
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    marginLeft: "240px", // Align to the right of the navbar
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    textAlign: "left",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
  },
  required: {
    color: "red",
    fontSize: "14px",
    marginLeft: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "16px",
  },
  saveButton: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    backgroundColor: "#4a90e2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#e4e4e4",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default EditProfile;
