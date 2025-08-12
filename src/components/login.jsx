import { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { UserSliceAction } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constant"

const Login = () => {

    const [email, setEmail] = useState("monkey@gmail.com");
    const [password, setPassword] = useState("Ss@621311")

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const getUser = useSelector((state) => state.User)

    
   async function handleLogin(e) {
        e.preventDefault();
       try {
           const res = await axios.post(BASE_URL+"/login", {
               email,password
           }, {
               withCredentials:true
           })
          
          console.log(res.data.user.photoUrl);
          
           dispatch(UserSliceAction.addUser(res.data.user))
           return navigate('/')
       }
       catch (err) {
           console.log(err.message)
       }
        
        setEmail("")
        setPassword("")
   }

    return <>
        <div className="flex justify-center">
            
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mt-10">
                <h2 className="card-title justify-center">Login</h2>
  <form onSubmit={handleLogin}>
  <label className="label mt-2">Email</label>
  <input type="email" className="input mt-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

  <label className="label mt-2">Password</label>
  <input type="password" className="input mt-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

  <button className="btn btn-neutral mt-4" type="submit">Login</button>
  </form>
</fieldset>
</div>
    </>
    
}
export default Login;