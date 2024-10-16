import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(signupState['email-address'])
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async() => {
    
    try{
      
      const response = await fetch("http://localhost:8000/api/User", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
          {
            firstName: signupState['firstname'],
            lastName: signupState['lastname'],
            nickname: signupState['username'],
            email: signupState['email-address'],
            zipcode: signupState['zipcode'],
            password: signupState['password'],
            friendsList: 0,
            followList: 0,
            karma: 0,
            communityIDs: 0,
            posts: 0,
            age: 0,
            searchTags: 0,
            postAndFlagsTags: 0,
            profilePic: 0,
            parentAccount: 0,
            parentAccountID: 0,
            childAccount: 0,
            childAccountID: 0,

          }
        )
        
      })

      if (response.ok) {
        console.log("Account created successfully!");
      } else {
        const errorData = await response.json(); // Try to parse the error response from the server
        console.error("Account creation failed:", errorData.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("An error occurred during account creation:", error); // Provide more detailed error info
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
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

          )
        }
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>



    </form>
  )
}