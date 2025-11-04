import { useContext } from "react"
import DataContext from "./context/DataContext"

const AnotherSource = () => {
    const {worker, color} = useContext(DataContext)
    return (
        <div>
            <h3>Another Source</h3>
            <p>The color is {color}</p>
            <button onClick={(worker)}>log</button>
        </div>
    )
}


export default AnotherSource