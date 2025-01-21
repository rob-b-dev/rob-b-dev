import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import the useAuth hook
import Header from './Header';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();  // Access the login function from context

    const handleRegisterClick = async (e) => {
        e.preventDefault();
        const registerData = { name, email, password };

        try {
            const response = await fetch("http://localhost:5001/auth/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authtoken', data.token);  // Store the auth token on registration to be accessed by authContext
                login(data.token);  // Call the login function to set isAuthenticated to true
                alert('Register successful');

                const previousPage = location.state?.from || '/home'; // Redirect to previous page or home
                localStorage.setItem('previousPage', previousPage);
                navigate(previousPage);
            } else {
                alert('Error during registration');
            }
        } catch (error) {
            alert('Server Error');
            console.error(error.message);
        }
    };

    return (
        <>
            <Header />
            <form onSubmit={handleRegisterClick} className="form">
                <h2 className="header-sm">Welcome! Register here</h2>
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    required
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    required
                />
                <div className="input-checkbox-container space-x-2">
                    <input
                        type="checkbox"
                        id="password"
                        onClick={() => setShowPassword((prev) => !prev)}
                    />
                    <label htmlFor="password">Show Password</label>
                </div>
                <button className="button button__primary" type="submit">
                    Continue
                </button>
                <p>
                    By signing up, you are agreeing to our{' '}
                    <a href="/termsandconditions">Terms and Conditions</a> and{' '}
                    <a href="/termsandconditions#privacy-policy">Privacy Policy</a>.
                </p>
                <p className="self-start">
                    Have an account? <a href="/login">Sign in</a>
                </p>
            </form>
        </>

    );
}

export default Register;
