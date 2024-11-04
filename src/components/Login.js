import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useAuthContext } from '../hooks/useAuthContext';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');
    const { dispatch } = useAuthContext();
    const [useFakeLogin, setUseFakeLogin] = useState(false);  // toggle for fake login

    const handleChange = (e) => setLoginState({ ...loginState, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email:", loginState['email-address']);
        console.log("Password:", loginState['password']);
        if (useFakeLogin) {
            await fakeAuthenticateUser();
        } else {
            await authenticateUser(); // call real api authenticateUser
        }
    };

    // real login
    const authenticateUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, { 
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginState['email-address'],
                    password: loginState['password'],
                })
            });
    
            const json = await response.json();
    
            if (response.ok) {
                console.log("Logged in successfully");
    
                // Store the JWT token in localStorage
                localStorage.setItem("token", json.token);
    
                // Optionally store user data separately if needed
                localStorage.setItem("user", JSON.stringify({ userId: json.userId, name: json.name }));
    
                dispatch({ type: 'LOGIN', payload: { userId: json.userId, name: json.name } });
            } else {
                setErrorMessage(json.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setErrorMessage('Error fetching user data. Please try again.');
            console.error("Fetch error:", error);
        }
    };

    // fake login
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
                        name: 'John Doe',
                    };
                    console.log("Logged in successfully (fake)");

                    // save fake user data to localStorage
                    localStorage.setItem('user', JSON.stringify(fakeUserData));
                    dispatch({ type: 'LOGIN', payload: fakeUserData });

                    resolve(true);
                } else {
                    setErrorMessage("Invalid email or password.");
                    console.log("Login failed: Invalid email or password (fake).");
                    resolve(false);
                }
            }, 1000); // simulate network delay
        });
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
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
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* toggle between real and fake login */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="fakeLogin"
                    checked={useFakeLogin}
                    onChange={(e) => setUseFakeLogin(e.target.checked)}
                />
                <label htmlFor="fakeLogin" className="ml-2">
                    Use Fake Login
                </label>
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}
