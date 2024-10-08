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

    const handleChange = (e) => setLoginState({ ...loginState, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticateUser(); // Call authenticateUser on form submit
    }



    // Handle Login API Integration here
    const authenticateUser = async () => {
        try {
            const response = fetch("api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        email: loginState['email-address'],
                        password: loginState['password'],

                    }
                )

            })
            if(response.ok){
                console.log("logged in")
            }else{
                console.log(loginState['email-address'])
                console.log(loginState['password'])
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


