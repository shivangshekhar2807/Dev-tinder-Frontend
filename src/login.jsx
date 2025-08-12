import { useState } from "react";
import axios from "axios"

const Login = () => {

    const [email, setEmail] = useState("Testing@gmail.com");
    const [password, setPassword] = useState("Ss@621311")
    
   async function handleLogin(e) {
        e.preventDefault();
       try {
           const res = await axios.post("http://localhost:3000/login", {
               email,password
           }, {
               withCredentials:true
           })
          
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