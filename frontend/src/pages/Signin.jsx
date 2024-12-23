import { Heading } from "../components/Heading.jsx"
import { Button } from "../components/Button.jsx"
import { ButtonWarning } from "../components/ButtonWarning.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div className="h-screen flex justify-center bg-blue-300">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
                <Heading label="Sign In"/>
                <SubHeading label="Enter your credentials to sign in"/>
                <InputBox label="Username" placeholder="karan@gmail.com" 
                onChange={(e) => setEmail(e.target.value)}/>
                <InputBox label="Password" placeholder="********"
                onChange={(e) => setPassword(e.target.value)}/>
                <div>
                    <Button label="Sign In" onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username:email,
                                password
                            })
                            
                            if(response.status==200){
                                localStorage.setItem("token", response.data.token)
                                navigate("/dashboard")
                            }
                        } catch (error) {
                            navigate("/signin")
                        }
                    }}/>
                </div>
                <ButtonWarning label="Don't have a account?" buttonText="Sign Up" to="/signup"/>
            </div>
        </div>        
    </div>
}