import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticateUser(); // Call authenticateUser on form submit
    }

    // Handle Login API Integration here
    const authenticateUser = async () => {
        try {
            const response = await fetch("https://cs4800-server.onrender.com/api/User");
            const users = await response.json();

            const { email, password } = loginState; // Extract email and password from loginState
            const user = users.find(user => user.email === email);

            // Check if user exists and if the password matches
            if (user && user.password === password) {
                console.log("YAY"); // Log YAY if the password matches
                console.log("The correct password is:", user.password); // Log the correct password
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Email or password is incorrect'); // Display error message
            }
        } catch (error) {
            setErrorMessage('Error fetching user data. Please try again.');
            console.error("Fetch error:", error);
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field => (
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
                    ))
                }
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}


