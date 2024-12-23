import { Link } from "react-router-dom";

export function ButtonWarning({label, buttonText, to}){
    return <div className="py-2 flex justify-center text-sm">
        <div>{label}</div>
        <Link to={to} className="pointer cursor-pointer underline pl-1">{buttonText}</Link>
    </div>
}