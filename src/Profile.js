// Profile.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {clearUser} from "./store"
import HomePage from './component/HomePage';

const Profile=()=> {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    // Check if the user is not authenticated (access token is not available)
    if (!user.accessToken) {
      navigate('/signup');
      alert("Please try Signup first")
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log(user)
    if (user.accessToken && window.location.pathname === '/signup') {
      // Redirect to profile page if the user has an access token and tries to access the signup page
      window.location.href = '/profile';
    }
  }, [user]);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');

    dispatch(clearUser())

    // Redirect to signup page
    navigate('/signup');
  };

  return (
    <div>
      <div className='p-5'>
      <h3>Profile</h3>
      <h5>Full Name: {user.name}</h5>
      {/* <h1>Email: {user.email}</h1>
      <h1>Password: {user.password}</h1> */}

     
      <button onClick={handleLogout} className='bg-gray-400 px-4 '>Logout</button>
      </div>
      <HomePage />
    </div>
  );
}

export default Profile;
