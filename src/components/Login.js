import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function FindPassword() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = async (e) => {
        const { id, value } = e.target;
        setLoginState({ ...loginState, [id]: value });
        
        // If email is entered, fetch the user and get the password
        if (id === 'email-address') {
            await findPasswordByEmail(value); // Fetch password based on email
        }
    }

    const findPasswordByEmail = async (email) => {
        try {
            const response = await fetch("https://cs4800-server.onrender.com/api/User");
            const users = await response.json();

            const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

            if (user) {
                console.log(`Password for ${email}: ${user.password}`); // Log the found password
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage(`No user found with the email: ${email}`);
            }
        } catch (error) {
            setErrorMessage('Error fetching user data. Please try again.');
            console.error("Fetch error:", error);
        }
    };

    return (
        <form className="mt-8 space-y-6">
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
            <FormAction handleSubmit={(e) => e.preventDefault()} text="Find Password" />
        </form>
    );
}

