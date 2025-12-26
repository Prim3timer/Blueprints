import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faArrowLeftm, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useState, useContext } from 'react'
import UserContext from '../context/userProvider'


const SingleImage = () => {
  const {currentIndex, setCurrentIndex, user, images} = useContext(UserContext)

  console.log(currentIndex) 
  const moveDown = () => {
    if (currentIndex <  1) setCurrentIndex(0)
      else {
    setCurrentIndex(()=> {
      const index = currentIndex - 1
      return index
    })
  }
  console.log(currentIndex) 
}
const moveUp = () => {
  console.log(currentIndex) 
  setCurrentIndex(() => {
       if (currentIndex  >  images.length - 2)setCurrentIndex(images.length - 1)
        else {
      
      const index = currentIndex + 1
      return index
    }
    
  })
  console.log(currentIndex)
  }
  return (
    <section>
    <div className='image-navigators-container'>
       <FontAwesomeIcon icon={faAngleLeft} onClick={moveDown} className='navas'/>
      <img className='single-image' src={`http://localhost:5000/images/${user.name}/${images && images[currentIndex].name}`} alt={images && images[currentIndex].name}/>  
      <FontAwesomeIcon icon={faAngleRight} onClick={moveUp} className='navas'/>
    </div>
      {/* <p>{dynameAlt}</p> */}
    </section>
  )
}

export default SingleImage
