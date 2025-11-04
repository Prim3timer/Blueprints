import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
 const [person, setPerson] = useState('Luke')
     const [color, setColor] = useState('brown')
    const worker = () => {
        console.log('worked')
    }
    const getEmployees = async () => {
        const response = await axios.get('http://localhost:5500/employees')
        console.log(response.data)
    }
    return  (
        <DataContext.Provider value={{
            worker, person, color, getEmployees
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext