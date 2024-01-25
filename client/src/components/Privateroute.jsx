
import {  useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"



function Privateroute() {
const CurrentUser=useSelector((state) => state.user)
  return CurrentUser ? <Outlet /> : <Navigate to='/sign-in'/>
}

export default Privateroute
