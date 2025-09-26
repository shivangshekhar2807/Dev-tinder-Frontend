// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constant";

// const Login = () => {
//   const [email, setEmail] = useState("shivang@gmail.com");
//   const [password, setPassword] = useState("Ss@621311");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           email,
//           password,
//         },
        
//         { withCredentials: true }
//       );

//       if (res.status !== 200) {
//         throw new Error("Login failed");
//       }
//       dispatch(addUser(res.data.user));
//       navigate("/");
//       console.log("res", res.data.user);
//     } catch (err) {
//       console.log(err);
//        setError("Wrong credential ❌");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <div className="card bg-base-100 shadow-2xl w-full max-w-lg">
//         <div className="card-body">
//           <h2 className="card-title text-3xl font-bold justify-center mb-6">
//             Login
//           </h2>

//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text text-lg">Email</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input input-bordered w-full"
//             />
//           </div>

//           <div className="form-control w-full mt-4">
//             <label className="label">
//               <span className="label-text text-lg">Password</span>
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="input input-bordered w-full"
//             />
//           </div>

//           {/* 🔹 Error message with shake effect */}
//           {error && (
//             <p className="text-red-500 font-semibold text-center mt-4 animate-shake">
//               {error}
//             </p>
//           )}

//           <div className="card-actions justify-center mt-6">
//             <button className="btn btn-primary w-full" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* 🔹 CSS for shake animation */}
//       <style>
//         {`
//           @keyframes shake {
//             0% { transform: translateX(0); }
//             25% { transform: translateX(-5px); }
//             50% { transform: translateX(5px); }
//             75% { transform: translateX(-5px); }
//             100% { transform: translateX(0); }
//           }
//           .animate-shake {
//             animation: shake 2s ease-in-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Login;








import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // 🔹 Toggle between login & signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    resetFields();
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status !== 201) throw new Error("Login failed");

      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Wrong credential ❌");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { email, password, firstName, lastName, gender },
        { withCredentials: true }
      );

      if (res.status !== 201) throw new Error("Signup failed");

      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError("Signup failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-2xl w-full max-w-lg">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* 🔹 Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          {/* 🔹 Password */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text text-lg">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </div>

          {/* 🔹 Show extra fields only in Signup */}
          {!isLogin && (
            <>
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="input input-bordered w-full"
                />
              </div>

              {/* 🔹 Gender Dropdown */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">Gender</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </>
          )}

          {/* 🔹 Error message */}
          {error && (
            <p className="text-red-500 font-semibold text-center mt-4 animate-shake">
              {error}
            </p>
          )}

          {/* 🔹 Submit button */}
          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* 🔹 Toggle Button */}
          <p className="text-center mt-4">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline font-semibold"
              onClick={toggleForm}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* 🔹 Shake animation */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
