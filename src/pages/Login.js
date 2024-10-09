import Header from "../components/Header"
import Login from "../components/Login"
import Home from "../pages/Home"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/Signup"
                linkNameHome="Home"
                linkUrlHome="/"

                />
            <Login/>
        </>
    )
}