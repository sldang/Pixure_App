import { useState } from 'react';
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

const fields = signupFields; // define signup form fields
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = ''); // initialize fields state

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState); // state for form data
    const [errorMessage, setErrorMessage] = useState(''); // state for error messages
    const [successMessage, setSuccessMessage] = useState(''); // state for success messages
    const [loading, setLoading] = useState(false); // state for loading spinner
    const navigate = useNavigate();
    

    // handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setSignupState((prevState) => {
            const updatedState = { ...prevState, [id]: value };
    
            // Check for password mismatch
            if (id === 'confirm-password' || id === 'password') {
                if (updatedState['confirm-password'] && updatedState['password']) {
                    if (updatedState['confirm-password'] !== updatedState['password']) {
                        setErrorMessage("Passwords do not match!");
                    } else {
                        setErrorMessage(""); // Clear error if they match
                    }
                }
            }
    
            return updatedState;
        });
    };
    

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // clear any previous errors
        setSuccessMessage(''); // clear any previous success messages
        setLoading(true); // show loading spinner during the process

        if (signupState['confirm-password'] !== signupState['password']) {
            setErrorMessage("Passwords do not match!");
            setLoading(false);
            return; // exit early
        }

        try {
            await createAccount(); // attempt to create account
        } catch (error) {
            setErrorMessage("an unexpected error occurred."); // catch generic errors
        } finally {
            setLoading(false);
             // stop loading spinner
        }
    };

    // function to create a new account
    const createAccount = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/User`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: signupState['firstname'], // user's first name
                    lastName: signupState['lastname'], // user's last name
                    nickname: signupState['username'], // user's username
                    email: signupState['email-address'], // user's email address
                    zipcode: signupState['zipcode'], // user's zipcode
                    password: signupState['password'], // user's password
                    followerList: [], // initialize empty follower list
                    followList: [], // initialize empty follow list
                    karma: 0, // default karma value
                    communityIDs: [], // default community ids
                    posts: [], // default number of posts
                    age: 0, // default age
                    searchTags: 0, // default search tags
                    postAndFlagsTags: 0, // default post and flag tags
                    profilePic: 0, // default profile picture
                    parentAccount: 0, // default parent account
                    parentAccountID: 0, // default parent account id
                    childAccount: 0, // default child account
                    childAccountID: 0, // default child account id
                    bio: "Everyone has a story to tell. I'm gonna tell you mine.", // default profile description/bio
                }),
            });

            if (response.ok) {
                setSuccessMessage("Account created successfully!"); // show success message
                setSignupState(fieldsState); // reset form fields
                setLoading(false);
                setTimeout(() => navigate("/login"), 1000);
            } else {
                const errorData = await response.json(); // parse server error
                setErrorMessage(errorData.error || "Account creation failed. Please try again."); // set error message
            }
        } catch (error) {
            setErrorMessage("An error occurred during account creation. Please try again."); // catch network errors
            console.error("Account creation error:", error); // log error for debugging
        }
    }   ;

    return (
        <div className="signup-card">
            <h1>Pixure</h1>
            <h2>Sign up to create an account</h2>
            <p>Already have an account? <a href="/login">Login</a></p>

            {/* signup form */}
            <form className="signup-form" onSubmit={handleSubmit}>
                {fields.map(field => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
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

                {/* show loading spinner or submit button */}
                {loading ? (
                    <div className="loading-spinner">Creating account...</div>
                ) : (
                    <FormAction handleSubmit={handleSubmit} text="Sign Up" />
                )}
            </form>
        </div>
    );
}
