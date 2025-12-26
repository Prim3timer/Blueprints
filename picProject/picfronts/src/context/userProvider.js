import { createContext, useState } from "react";
import User from "../components/User";
import axios from 'axios'

const UserContext = createContext({})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
        const [user, setUser] = useState()
        const [images, setImages] = useState()
            const [name, setName] = useState()
             const [id, setId] = useState()
             const [users, setUsers] = useState([])
               let [currentIndex, setCurrentIndex] = useState(0)
            
    const [age, setAge]  = useState()
       function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleEdit = (e)=> {
  setCurrentUser(user) 
}

  const getUsers =  async () => {
        console.log(id)
        const response  = await axios.get('http://localhost:5000/user')    
        setUsers(response.data)  
    console.log(response.data)
    //    const foundUser = response.data.find((user) => user.id === id)
    //    console.log(foundUser.image) 
    //    const streamlinedImages = []
    //    foundUser.image.map((item) => {
    //      if (item.name !== 'noPic') streamlinedImages.push(item)
    //      })
    //     console.log(streamlinedImages)
    //     setImages(streamlinedImages)
    //    setCurrentUser(foundUser)
      
    //    if (foundUser)  setUser(foundUser)
    //     else console.log('no such user found')
    }
        return (
        <UserContext.Provider value={{
            currentUser, setCurrentUser, handleEdit, user, setUser, 
            age, setAge, name, setName, numberWithCommas, images, setImages, getUsers, id, setId,
            users, setUsers, currentIndex, setCurrentIndex
        }}>
            {children}
        </UserContext.Provider>
    )

}



export default UserContext