import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useAuthContext } from '../hooks/useAuthContext';

const fields = loginFields; // import predefined form fields
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = ''); // initialize field states

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState); // state for form data
    const [errorMessage, setErrorMessage] = useState(''); // state for error messages
    const [successMessage, setSuccessMessage] = useState(''); // state for success messages
    const [loading, setLoading] = useState(false); // state for loading spinner
    const [useFakeLogin, setUseFakeLogin] = useState(false); // toggle for using fake login
    const { dispatch } = useAuthContext(); // access dispatch from auth context

    // handle form input changes
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // clear previous error message
        setSuccessMessage(''); // clear previous success message
        setLoading(true); // set loading to true while processing

        try {
            if (useFakeLogin) {
                await fakeAuthenticateUser(); // use fake login if toggled
            } else {
                await authenticateUser(); // use real login otherwise
            }
        } catch (error) {
            setErrorMessage('an unexpected error occurred.'); // show generic error message
        } finally {
            setLoading(false); // stop loading spinner
        }
    };

    // clear the form fields
    const clearForm = () => {
        setLoginState(fieldsState);
    };

    // real login function
    const authenticateUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, { 
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginState['email-address'],
                    password: loginState['password'],
                }),
            });

            const json = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json)); // save user data to localstorage
                dispatch({ type: 'LOGIN', payload: json }); // update auth state
                setSuccessMessage('logged in successfully!'); // show success message
                clearForm(); // clear form after successful login
            } else {
                setErrorMessage(json.error || "login failed. please check your credentials."); // show server error
            }
        } catch (error) {
            setErrorMessage('error fetching user data. please try again.'); // show fetch error
            console.error("fetch error:", error);
        }
    };

    // fake login function
    const fakeAuthenticateUser = async () => {
        const fakeCredentials = {
            email: 'test@test.com',
            password: 'password123',
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                if (
                    loginState['email-address'] === fakeCredentials.email &&
                    loginState['password'] === fakeCredentials.password
                ) {
                    const fakeUserData = {
                        email: fakeCredentials.email,
                        token: 'fake-jwt-token',
                        name: 'john doe',
                    };

                    localStorage.setItem('user', JSON.stringify(fakeUserData)); // save fake user data
                    dispatch({ type: 'LOGIN', payload: fakeUserData }); // update auth state
                    setSuccessMessage('logged in successfully (fake)!'); // show success message
                    clearForm(); // clear form after successful fake login
                    resolve(true);
                } else {
                    setErrorMessage("invalid email or password."); // show error for incorrect fake login
                    resolve(false);
                }
            }, 1000); // simulate network delay
        });
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Pixure</h1>
                <h2>Login to your account</h2>
                <p>Don't have an account yet? <a href="/signup">Sign up</a></p>

                {/* login form */}
                <form className="login-form" onSubmit={handleSubmit}>
                    {fields.map(field => (
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
                    ))}

                    {/* display error or success messages */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    {/* loading spinner or submit button */}
                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        <FormAction handleSubmit={handleSubmit} text="log in" />
                    )}
                </form>

                {/* forgot password link */}
                <div className="forgot-password">
                    <a href="/forgot-password">Forgot password?</a>
                </div>
            </div>
        </div>
    );
}
