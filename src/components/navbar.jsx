import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios"
import { UserSliceAction } from "../utils/userSlice";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {



  const getUser = useSelector((state) => state.User)
  const dispatch = useDispatch();
   const navigate=useNavigate()
  console.log(getUser.photoUrl, "navbar")
  
  const handleLogout = async () => { 

     try {
       await axios.post(BASE_URL + '/logout', {}, {
        withCredentials:true
       })
       dispatch(UserSliceAction.removeUser())
       navigate('/login')
    }
    catch (err) {
      console.log(err.message)
  }
  }
   
  

    return <>
          <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"><Link to='/'>Dev Tinder</Link></a>
  </div>
  <Link to='/login'>Login</Link>
  
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
   {getUser && (<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-4">
        <div className="w-10 rounded-full ">
          <img
            alt="User Photo"
            src={getUser.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            <Link to='/profile'> Profile</Link>
            
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
    </>
    
}
export default Navbar;