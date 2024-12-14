import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCommunity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    communityType: "General (No Age Restriction)", // Default community type
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("attmept");
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages
    setLoading(true); // Show loading spinner during the process

    try {
      // Determine restriction based on communityType
      const restrict =
        formData.communityType === "General (No Age Restriction)" ? false : true;

      // Make API request to create community
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/community/createCommunity`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            communityPosts: [],
            communityMembers: [],
            description: formData.description,
            restriction: restrict,
            imageString: formData.imageUrl,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Community created !"); // Show success message
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          communityType: "General (No Age Restriction)",
        }); // Reset form fields
        setTimeout(() => navigate("/explore"), 2000);
      } else {
        const errorData = await response.json(); // Parse server error
        setErrorMessage(
          errorData.error || "Community creation failed. Please try again."
        ); // Set error message
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred during community creation. Please try again."
      ); // Catch network errors
      console.error("Community creation error:", error); // Log error for debugging
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Create a New Community</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Community Name */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">
              Community Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter a community name"
              required
            />
          </div>

          {/* Community Description */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="description">
              Description <span style={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Briefly describe your community"
              required
            />
          </div>

          {/* Community Type Dropdown */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="communityType">
              Community Type
            </label>
            <select
              id="communityType"
              name="communityType"
              value={formData.communityType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="General (No Age Restriction)">
                General (No Age Restriction)
              </option>
              <option value="18+ (Age-Restricted)">18+ (Age-Restricted)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.createButton}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Community"}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate("/explore")}
            >
              Cancel
            </button>
          </div>

          {/* Display Error or Success Messages */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    minHeight: "120px",
    transition: "border-color 0.3s",
  },
  fileInput: {
    display: "block",
    fontSize: "14px",
    marginTop: "10px",
  },
  select: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#ffffff",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  createButton: {
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

export default CreateCommunity;
