import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import SingleImage from './SingleImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import UserContext from '../context/userProvider'


const User = () => {

  const {currentUser, setCurrentUser, handleEdit, user, setUser, numberWithCommas, images, setImages, getUsers, id, setId, users,
    currentIndex, setCurrentIndex
  } = useContext(UserContext)  
  console.log(users)  
console.log(user)
  

    const [source, setSource] = useState()
    // const [images, setImages] = useState()
    const [alter, setAlter] = useState()
    const [info, setInfo] = useState()
    const getUser =  async () => {
      const foundUser = users.find((user) => user.id === id)  
      // setImages(foundUser.image)
      try {
        
        console.log(foundUser)
     if (foundUser){
       console.log(foundUser.image)
       setCurrentUser(foundUser)
       
       setUser(foundUser)
       const streamlinedImages = []
       foundUser.image.map((item) => {
         if (item.name !== 'noPic') streamlinedImages.push(item)
         })
        console.log(streamlinedImages)
        setImages(streamlinedImages)
    } 
    else {
      
      throw new Error('no user found')
     
      
     }
      } catch (error) {
        console.log((error.message))
        setInfo(error.message)
      }
    }
    useEffect(()=> {

      getUser()
    }, [])

    useEffect(() => {
        getUsers()   
     }, [])  

const handleIndex = (imageId) => {
const userImages = user.image
const currentImageName = userImages.find((item) => item.id === imageId)
const index = images.indexOf(currentImageName)
setCurrentIndex(index)
console.log(index)
}

   return (
  users &&  <div className='user'>
   
{/* <h3 className='user-header'>{user.name}</h3> */}
  { user && <SingleImage  user={user} source={source} />}
  <section className='images-container'>
    <article className='images-inner-container'
    //  style={{
    //   width: `${images.length }` * unit + `px`
    // }}
    >
{images && images.map((image, i) => {
  console.log(source)
  return (
  <img src={`http://localhost:5000/images/${user.name}/${image.name}`} alt={image.name} key={i} onClick={() => handleIndex(image.id)}/>
  )
})}
   <p>{info}</p>
</article>
</section>
      <h3>{user && user.name}</h3>
      <h3>{user && numberWithCommas(user.age)}</h3>
       
   {/* <input type="file"  multiple/> */}
     <Link to="/edit-user"
               onClick={handleEdit}
           >
              <FontAwesomeIcon icon={faPenToSquare} />
           </Link>
           
    </div>
  )
}

export default User
