import { Users } from "../components/Users.jsx"
import { Balance } from "../components/Balance.jsx"
import { Appbar } from "../components/Appbar.jsx"

export const Dashboard = () => {
    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value="10,000"/>
            <Users/>
        </div>
    </div>
}