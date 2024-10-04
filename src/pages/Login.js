import Header from "../components/Header"
import Login from "../components/Login"
import Home from "/Home"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                linkName1="home"
                linkUrl1="/home"

                />
            <Login/>
        </>
    )
}