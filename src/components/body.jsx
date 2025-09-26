import React, { useEffect } from "react";
import axios from "axios";
import Footer from "./footer";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const refresh = useSelector((state) => state.refresh);

  useEffect(() => {
    const fetchUser = async () => {
      // if (Object.keys(userData).length > 0) {
      //   return;
      // }
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });

        console.log("res......", res);

        if (res.status !== 200) {
          throw new Error("Fetch Profile Failed");
        }

        dispatch(addUser(res.data.data));
      } catch (err) {
        console.log("errrrrrr", err);
        if (err.response && err.response.status === 401) {
          console.log("401 detected");
          navigate("/login");
        } else {
          console.log("Other error:", err);
        }
      }
    };

    fetchUser();
  }, [refresh]);
  return (
    <>
      <NavBar></NavBar>
      {/* <div className="pb-20"> */}
        
       
        <Outlet />
      {/* </div> */}
      <Footer></Footer>
    </>
  );
};

export default Body;
