// Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './store';
import "./Signup.css"

const Signup=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[position, setPosition] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = () => {
    // Validate form inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are mandatory');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Generate access token
    const accessToken = generateAccessToken();

    // Create user object
    const user = {
      name,
      email,
      password,
      accessToken,
      position,
    };

    // Save user data in local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Dispatch action to set user in Redux store
    dispatch(setUser(user));
    

    // Show success message
    setSuccess('Signup successful');

    // Reset form inputs
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPosition('');

    // Redirect to profile page
    navigate('/profile');
  };

  const generateAccessToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let accessToken = '';
    for (let i = 0; i < 16; i++) {
      accessToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return accessToken;
  };

  return (
    <div className='signup-container'>
      <h1>Signup</h1>
      
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
// =====================================================================================================
// import React, { useState } from 'react';
// import axios from 'axios';
// import {  useNavigate } from 'react-router-dom';

// const api_signup = "http://localhost:5000/api/v1/signUp";

// const Signup = () => {
//   const Navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     position: "",
//     userName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(api_signup, formData);
//       console.log(response.data);
      
//       // Navigate('/homePage'); 
//     } catch (error) {
//       console.error("Error signing up:", error);
     
//     }
//   };
  



//   return (
//     <div>
//       <div className="flex min-h-full flex-col justify-center items-center">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
//         </div>

//         <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm shadow-md p-4">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
//               <div className="mt-2">
//                 <input
//                   id="username"
//                   name="userName"
//                   type="text"
//                   value={formData.userName}
//                   onChange={handleChange}
//                   autoComplete="userName"
//                   required
//                   className="block p-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
                
//                   required
//                   className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
               
//                   required
//                   className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">Position</label>
//               <div className="mt-2">
//                 <input
//                   id="position"
//                   name="position"
//                   type="position"
//                   value={formData.position}
//                   onChange={handleChange}
                  
//                   required
//                   className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <button type="submit" onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

