import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import './Header.css';
import logo from './../images/logo.png'
import React, { useState, useEffect } from 'react';
import { useLogout } from "../../hooks/UseLogout";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const [stickyClass, setStickyClass] = useState('');
  const { logout } = useLogout();
  const roleCode = localStorage.getItem("roles");
  const location = useLocation();
  // Check if the current path is the home page
  const isHomePage = location.pathname === '/';
  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 0 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };
  return (
    <div>
      {/* {isHomePage && (
      <div className="header-top">
        <div className="container">
          <div className="top-header row">
            <div className="col-xl-6 col-lg-6">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
              <Link to='/'>Customer Service: 678-631-7275</Link>
            </div>
            <div className="col-xl-6 col-lg-6">
              <Link to='/' className="button1">Membership Sign Up</Link>
              {!roleCode ? (
                <Link to='/log-in' className="button1">Login</Link>
              ) : (
                <Link onClick={() => { logout(""); }} className="button1">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      )} */}
      <div className="header-top">
        <div className="container">
          <div className="top-header row">
            <div className="col-xl-6 col-lg-6">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
              <Link to='/'>Customer Service: 678-631-7275</Link>
            </div>
            <div className="col-xl-6 col-lg-6">
              <Link to='/' className="button1">Membership Sign Up</Link>
              {!roleCode ? (
                <Link to='/log-in' className="button1">Login</Link>
              ) : (
              //   <button type="button" className="logout" onClick={handleLogout}>
              //   Logout
              // </button>
              <button onClick={() => { logout(""); }} className="button1">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <header className={` ${stickyClass}`}>
        <div className="container">
          <div className="nav-area">
            {/* for large screens */}
            <Navbar />
            {/* for small screens */}
            <MobileNav />
          </div>
        </div>
      </header>
    </div>
  )
};
export default Header;