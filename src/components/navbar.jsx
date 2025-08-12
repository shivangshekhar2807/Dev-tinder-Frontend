import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {



  const getUser = useSelector((state) => state.User)
  console.log(getUser.photoUrl,"navbar")
  

    return <>
          <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Dev Tinder</a>
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
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
    </>
    
}
export default Navbar;