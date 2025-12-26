import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {FaTrash} from 'react-icons/fa'
import UserContext from "../context/userProvider"


const UserList = () => {
        const [file, setFile] = useState()
        const [files, setFiles] = useState()
        const [data, setData] = useState()


const {numberWithCommas, setCurrentIndex, setId, user, setUsers, users, getUsers} = useContext(UserContext)



   const oneUser = (id) => {
    setId(id)
    // refresh current index for the next item on the list selected
    setCurrentIndex(0)
   }

 

   const removeUser = async (id) => {
    const foundUser = users.find(user => user.id === id)
    const {name} = foundUser
    const myObj = {id, name}
    console.log(myObj)

    const respons = await axios.delete(`http://localhost:5000/${JSON.stringify(myObj)}`)
    const newUsers = users.filter((user) => user.id !== id)
    setUsers(newUsers)
    console.log(respons.data)
   }
   useEffect(()=>{
    getUsers()
   }, [])   
  //  useEffect(()=>{
  //   getUsers()
  //  }, [])   
      return (
        <div >
            <h2 className="users-list-header">Users List</h2>
          <section className="users-list">
            {users && users.map((user, i) => {
              return  (
                <section onClick={() => oneUser(user.id)} key={user.id} className="credentials">
              {console.log(user.image[0])}
              {console.log(user.name)}
          <Link to="/user">
               {/* find the first picture in the image array and display */}
                <img className="gen-image" src={`http://localhost:5000/images/${user.name}/${user.image.find((item) => item.name !== 'noPic').name}`} alt={user.image[0] ? user.image[0].name : ''} />
                    <h3>{user.name}</h3>
                    <h3 >{numberWithCommas(user.age)}</h3>
                  
            </Link>
                    <p onClick={() => removeUser(user.id)}>
                      <FaTrash/>
                    </p>
              
                </section>
            )
            })}
            </section>
        </div>
    )
}

export default UserList