import FileUpload from "./components/FileUpload";
import UsersList from "./components/UsersList";
import CreateUser from "./components/CreatUser";
import User from "./components/User";
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import EditUser from "./components/EditUser";

function App() {
  const [id, setId] = useState()

  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
     <h2> Image HQ</h2>
      </header>
     <Routes>
    <Route path="/file-upload" element={<FileUpload/>} />
    <Route path="/user" element={<User/>} />
    <Route path="/users-list" element={<UsersList/>} />
    <Route path="/create-user" element={<CreateUser/>} />
    <Route path="/edit-user" element={<EditUser/>} />
     
    

   
     </Routes>
    </div>
  );
}

export default App;
