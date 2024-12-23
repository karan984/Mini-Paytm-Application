import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { ButtonWarning } from "../components/ButtonWarning.jsx"
import { Button } from "../components/Button.jsx"
import axios from "axios"

export const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    return <div className="bg-blue-300 h-screen flex justify-center">
        <div className="flex justify-center flex-col">
            <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max">
                <Heading label="Sign Up"/>
                <SubHeading label="Enter your information to create an account"/>
                <InputBox placeholder="Karan" label="First Name" onChange={(e)=>{setFirstName(e.target.value)}}/>
                <InputBox placeholder="Mashru" label="Last Name" onChange={(e)=>{setLastName(e.target.value)}}/>
                <InputBox placeholder="karan@gmail.com" label="Username (Email)" onChange={(e)=>{setUsername(e.target.value)}}/>
                <InputBox placeholder="*********" label="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="p4-t">
                    <Button
                        onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")
                        }}
                        label="Sign Up"
                    />
                </div>
                <ButtonWarning label="Already have an account?" buttonText="Sign In" to="/signin"/>
            </div>
        </div>
    </div>
}