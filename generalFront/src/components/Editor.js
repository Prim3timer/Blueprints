import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"

const Editor = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
   useEffect(()=> {
          let isMounted = true
          const controller = new AbortController()
  
          const getEmployes = async () => {
              try {
                  const response = await axiosPrivate.get('/employees', {
                      signal: controller.singal
                  })
                  console.log(response.data)
                  isMounted  && setEmployees(response.data)
              } catch (err){
                  console.error(err)
                  navigate('/login', {state: { from: location}, replace: true})
              }
          }
  
          getEmployes()
  
          return () => {
              isMounted = false
              controller.abort()
          }
      }, [])
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
           <ul>
            {employees.map((employee, i) => {
                return (
                    <li key={i}>{employee.firstName}</li>
                )
            })}
           </ul>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor
