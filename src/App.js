import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Profile from './Profile';
import SignUp from './Signup';
import './App.css';

const App = () => {
  const user = useSelector((state) => state.user);
  

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signup" />} />
          <Route path="/" element={<Navigate to="/signup"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
