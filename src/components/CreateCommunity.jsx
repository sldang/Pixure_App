import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCommunityContext } from "../contexts/CommunityContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCommunity = () => {
  const navigate = useNavigate();
  const { dispatch } = useCommunityContext();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    communityType: "General (No Age Restriction)", // Default community type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error("Please fill out all required fields!");
      return;
    }

    const newCommunity = {
      ...formData,
      members: 0,
    };

    dispatch({ type: "ADD_COMMUNITY", payload: newCommunity });
    toast.success(`Community "${formData.name}" has been created!`);
    setTimeout(() => navigate("/explore"), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create a Community</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
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
              placeholder="Enter community name"
            />
          </div>
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
              placeholder="Enter community description"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="imageUpload">
              Upload Community Image
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
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

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              Create
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate("/explore")}
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

// styles for the component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "5px",
  },
  required: {
    color: "red",
    fontSize: "14px",
    marginLeft: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    minHeight: "100px",
    transition: "border-color 0.3s",
  },
  fileInput: {
    display: "block",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    outline: "none",
    marginTop: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: "#fff",
    transition: "border-color 0.3s",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#4a90e2",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#e4e4e4",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default CreateCommunity;
