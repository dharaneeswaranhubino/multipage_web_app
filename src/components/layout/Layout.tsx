import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />

      <div className="container" style={{marginTop:"80px"}}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;