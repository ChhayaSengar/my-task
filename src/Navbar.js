import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  './Navbar.css';
const Navbar = () => {
    const user=useSelector((state)=>state.user)



  return (
    <nav className="navbar">
        <span className='p-2'>Header</span>
    <ul>
        
      
        {
        
        user? <li><Link to="/profile"  
        > <div onClick={()=>alert("Please try logout first")}>
             Signup
            </div></Link> </li>  : 
        <li><Link to="/signup">Signup</Link></li>

        }
      
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
    
  </nav>
  )
}

export default Navbar