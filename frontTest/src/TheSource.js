import { useContext } from "react"
import DataContext from "./context/DataContext"

const TheSource = () => {
    const {person, getEmployees} = useContext(DataContext)
 
    return (
        <div>
            <h3>The Source</h3>
            <p>My name is {person}</p>
            <button onClick={getEmployees}>Get Them</button>

        </div>
    )
}

export default TheSource