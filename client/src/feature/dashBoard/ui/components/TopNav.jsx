import {NavLink} from "react-router"
import { useAuth } from "../../../auth/hooks/useAuth.js"
const TopNav = () => {
  const {handleLogout} =useAuth()
  return (
    <div className="w-full h-18 pt-4 px-10 flex justify-between  bg-gray-400 text-white">
        <h1 className="font-semibold text-2xl">Logo</h1>
      <NavLink className="h-10 bg-gray-700 rounded py-2 px-4"  onClick={handleLogout}>Logout</NavLink>
    </div>
  )
}

export default TopNav
