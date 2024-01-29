// import React from 'react'
import {BrowserRouter,Route,Routes} from  "react-router-dom"
import SignIn from "./pages/Signin.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import SignUp from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";
import Privateroute from "./components/Privateroute.jsx";
function App() {
  return(<BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/'  element={<Home/>} />
    <Route path='/sign-in' element={<SignIn/>} />
    <Route path='/sign-up'  element={<SignUp/>} />
    <Route path='/about'  element={<About/>} />
    <Route element={<Privateroute/>}>
          <Route path='/profile' element={<Profile/>} />
     </Route>     
  </Routes>
  </BrowserRouter>)
}

export default App

