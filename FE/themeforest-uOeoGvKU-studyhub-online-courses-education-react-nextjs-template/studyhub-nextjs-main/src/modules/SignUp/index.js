import Users from "@/data/users.json";
import { setUserData } from '@/redux/user/actionCreator';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUpModule() {
  const [users, setUsers] = useState(Users);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

	const admin = useSelector((state) => state.user.admin);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.rePassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Check if email already exists
    const emailExists = users.some(user => user.email === formData.email);
    if (emailExists) {
      setMessage('Email is already registered.');
	    console.error('Error: Email is already registered');
      return;
    }

    // Check if username already exists
    const usernameExists = users.some(user => user.username === formData.username);
    if (usernameExists) {
      setMessage('Username is already taken.');
	    console.error('Error: Username is already taken');
      return;
    }

    // Add new user to users array
    const newUser = {
      id: users.length + 1,  // Simple ID generation
      registration: new Date().toLocaleString(),  // Current date as registration date
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.split(' ')[1] || '',
      username: formData.username,
      password: formData.password,
      email: formData.email,
      phone: '',
      designation: '',
      biography: '',
      role: 'student',  // Default role
    };

    setUsers([...users, newUser]);
    dispatch(setUserData(newUser));
    setMessage('Registration successful!');

    router.push('/dashboard');
  };

  useEffect(() => {
    if (admin) {
      setMessage('You are already logged in.');
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="login-registration-wrapper">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="login-page-form-area">
              <h4 className="title">Sign Up to Your Account👋</h4>
              <form onSubmit={handleSignUp}>
                <div className="single-input-wrapper">
                  <label htmlFor="name">Your Name*</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="half-input-wrapper">
                  <div className="single-input-wrapper">
                    <label htmlFor="username">User Name</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter User Name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="email">Email*</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="half-input-wrapper">
                  <div className="single-input-wrapper">
                    <label htmlFor="password">Your Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="rePassword">Re-enter Password</label>
                    <input
                      id="rePassword"
                      type="password"
                      placeholder="Re Password"
                      value={formData.rePassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="single-checkbox-filter">
                  <div className="check-box">
                    <input type="checkbox" id="type-1" required />
                    <label htmlFor="type-1">Accept the Terms and Privacy Policy</label><br />
                  </div>
                </div>
                <button type="submit" className="rts-btn btn-primary">Sign up</button>
                <p>Already have an account? <Link href="/signin">Sign in</Link></p>
              </form>

              {message && <p>{message}</p>}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-thumbnail-login-p mt--100">
              <Image src="/images/banner/login-bg.png" width="1202" height="988" alt="login-form" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
