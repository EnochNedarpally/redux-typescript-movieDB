import React from 'react'
import { Link } from 'react-router-dom';
import "./Header.scss";
const Header = () => {
  return (
    <div className='headerContainer'>
       <Link to ="/"> <h3 className="logo">mDB</h3> </Link>
        <img src="https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png" alt="Profile" />
    </div>
  )
}

export default Header