import { useNavigate } from "react-router-dom"

export function Appbar(){
    const navigate = useNavigate();
    return <div className="flex justify-between shadow h-14">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="h-12 w-20 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    <button onClick={(e)=>{
                        localStorage.removeItem("token")
                        navigate("/signin")
                    }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
}