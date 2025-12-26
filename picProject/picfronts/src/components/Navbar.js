import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* <Link to="/file-upload">File Upload</Link> */}
      <Link to="/create-user">Create User</Link>
      <Link to="/users-list">Users List</Link>
      <Link to="/edit-user">Edit User</Link>
    </div>
  )
}

export default Navbar
