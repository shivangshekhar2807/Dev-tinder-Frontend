import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Body = () => {
    return <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
    
}
export default Body;