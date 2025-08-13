import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { UserSliceAction } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios"


const Body = () => {

    const navigate=useNavigate()
    const dispatch = useDispatch();
    const User=useSelector((state)=>state.User)

    const UserData = async () => {
       if(User.length==0)return
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
            withCredentials:true
            })
            console.log("profile data",res.data.data)
            dispatch(UserSliceAction.addUser(res.data.data))

        }
        catch (err) {

            console.log(err.status)
            if (err.status === 401) {
                 navigate('/login')
            }
            

        }
    }


    useEffect(() => {
        console.log("Body mounted");
      
            UserData()
        
        
    },[])

    return <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
    
}
export default Body;