import Header from "../components/Header"
import Login from "../components/Login"
import Home from "../pages/Home"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Home"
                linkUrl="/"
                />
            <Login
            linkName1 = "Signup"
            linkUrl1 = "/signup"
            />
        </>
    )
}