import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages
    const navigate = useNavigate(); // Initialize navigate function

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
        setErrorMessage(""); // Clear error message on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    const authenticateUser = async () => {
        try {
            const response = await fetch("https://cs4800-server.onrender.com/api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginState['email-address'], // Ensure this matches the id in your form
                    password: loginState['password']
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Login successful', data.user);
                navigate('/Home'); 
            } else {
                // Set error message for failed login
                setErrorMessage(data.message || 'Login failed. Please check your credentials.'); // Show message from API or a default message
            }
        } catch (error) {
            console.error("An error occurred during login", error);
            setErrorMessage('An error occurred. Please try again later.'); // Set error message for network errors
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}
