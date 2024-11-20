// src/components/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './Signup.css';

const Signup: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      firstname: '',
      lastname: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
  
    const validateStep1 = () => {
      const newErrors: { [key: string]: string } = {};
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(formData.username)) {
        newErrors.username = 'Username must be 3-15 characters and contain only letters, numbers, and underscores';
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
      }
      return newErrors;
    };
  
    const validateStep2 = () => {
      const newErrors: { [key: string]: string } = {};
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (!formData.address) {
        newErrors.address = 'Address is required';
      }
      if (!formData.firstname) {
        newErrors.firstname = 'First name is required';
      } else if (!/^[a-zA-Z]+$/.test(formData.firstname)) {
        newErrors.firstname = 'First name must contain only letters';
      }
      if (!formData.lastname) {
        newErrors.lastname = 'Last name is required';
      } else if (!/^[a-zA-Z]+$/.test(formData.lastname)) {
        newErrors.lastname = 'Last name must contain only letters';
      }
      return newErrors;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSignup = async () => {
      const validationErrors = validateStep2();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      setLoading(true);
      try {
        const response = await axios.post('https://fakestoreapi.com/users', formData);
        if (response.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Signup failed', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className='outer-container'>
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-header">
            <div className="signup-logo"></div>
            <h2>Sign Up</h2>
          </div>
          {step === 1 && (
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              {errors.username && <div className="error">{errors.username}</div>}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && <div className="error">{errors.password}</div>}
              <button onClick={() => {
                const validationErrors = validateStep1();
                if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                } else {
                  setErrors({});
                  setStep(2);
                }
              }}>
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
              {errors.address && <div className="error">{errors.address}</div>}
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstname && <div className="error">{errors.firstname}</div>}
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastname && <div className="error">{errors.lastname}</div>}
              <button onClick={handleSignup} disabled={loading}>Sign Up</button>
              <button onClick={() => setStep(1)}>Back</button>
              {loading && <Spinner />}
            </div>
          )}
          <p className="signup-link">
                  Already Registered ? <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
      </div>
    );

  };
  
  export default Signup;


// const Signup: React.FC = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//       username: '',
//       email: '',
//       password: '',
//       phone: '',
//       address: '',
//       firstname: '',
//       lastname: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//     const navigate = useNavigate();
  
//     const validateStep1 = () => {
//       const newErrors: { [key: string]: string } = {};
//       if (!formData.username) newErrors.username = 'Username is required';
//       if (!formData.email) newErrors.email = 'Email is required';
//       if (!formData.password) newErrors.password = 'Password is required';
//       return newErrors;
//     };
  
//     const validateStep2 = () => {
//       const newErrors: { [key: string]: string } = {};
//       if (!formData.phone) newErrors.phone = 'Phone number is required';
//       if (!formData.address) newErrors.address = 'Address is required';
//       if (!formData.firstname) newErrors.firstname = 'First name is required';
//       if (!formData.lastname) newErrors.lastname = 'Last name is required';
//       return newErrors;
//     };
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSignup = async () => {
//       const validationErrors = validateStep2();
//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//         return;
//       }
  
//       setLoading(true);
//       try {
//         const response = await axios.post('https://fakestoreapi.com/users', formData);
//         if (response.status === 200) {
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('Signup failed', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return (
//       <div className="signup-container">
//         <div className="signup-box">
//           <div className="signup-header">
//             <div className="signup-logo"></div>
//             <h2>Sign Up</h2>
//           </div>
//           {step === 1 && (
//             <div>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//               />
//               {errors.username && <div className="error">{errors.username}</div>}
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//               />
//               {errors.email && <div className="error">{errors.email}</div>}
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//               />
//               {errors.password && <div className="error">{errors.password}</div>}
//               <button onClick={() => {
//                 const validationErrors = validateStep1();
//                 if (Object.keys(validationErrors).length > 0) {
//                   setErrors(validationErrors);
//                 } else {
//                   setErrors({});
//                   setStep(2);
//                 }
//               }}>
//                 Next
//               </button>
//             </div>
//           )}
//           {step === 2 && (
//             <div>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//               />
//               {errors.phone && <div className="error">{errors.phone}</div>}
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Address"
//               />
//               {errors.address && <div className="error">{errors.address}</div>}
//               <input
//                 type="text"
//                 name="firstname"
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 placeholder="First Name"
//               />
//               {errors.firstname && <div className="error">{errors.firstname}</div>}
//               <input
//                 type="text"
//                 name="lastname"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//               />
//               {errors.lastname && <div className="error">{errors.lastname}</div>}
//               <button onClick={handleSignup} disabled={loading}>Sign Up</button>
//               <button onClick={() => setStep(1)}>Back</button>
//               {loading && <Spinner />}
              
//             </div>
//           )}
//           <p className="signup-link">
//                   Already Registered ? <span onClick={() => navigate('/login')}>Login</span>
//           </p>
//         </div>
//       </div>
//     );
//   };
  
//   export default Signup;