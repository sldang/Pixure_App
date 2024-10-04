import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function FindPassword() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');
    const [foundPassword, setFoundPassword] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handlePasswordChange = (e) => {
        setEnteredPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await findPasswordByEmail();
    }

    // Handle Find Password API Integration here
    const findPasswordByEmail = async () => {
        try {
            const response = await fetch("https://cs4800-server.onrender.com/api/User");
            const users = await response.json();

            const user = users.find(user => user.email.toLowerCase() === loginState['email-address'].toLowerCase());

            if (user) {
                setFoundPassword(user.password); // Store the found password for comparison
                setErrorMessage('');
            } else {
                setFoundPassword('');
                setErrorMessage(`No user found with the email: ${loginState['email-address']}`);
            }
        } catch (error) {
            setErrorMessage('Error fetching user data. Please try again.');
            console.error("Fetch error:", error);
        }
    };

    const verifyPassword = () => {
        if (enteredPassword === foundPassword) {
            console.log('logging in');
            navigate("/Home")
        } else {
            console.log('Passwords is incorrect.');
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

            {foundPassword && (
                <div>
                    <button type="button" onClick={verifyPassword}>Verify Password</button>
                </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Find Password" />
        </form>
    );
}
