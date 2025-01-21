// Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import the useAuth hook
import Header from './Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { login } = useAuth();  // Get the login function from context - stored globally

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:5001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token);  // Call login function from context after successful login
                alert('Login successful');
                console.log("Token received:", data.token);  // Log the token to ensure it's being received
                navigate("/home")  // Redirect to home
            } else {
                alert('Error during login');
            }
        } catch (error) {
            alert('Server Error');
            console.error(error.message);
        }
    };


    return (
        <>
            <Header />
            <form onSubmit={handleSubmitLogin} className="container-col container-col__form center">
                <h2 className="header-sm">Log into my account</h2>

                {/* Email input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password input */}
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="input-checkbox-container space-x-2">
                    <input
                        className="pointer"
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
                    By continuing, you are agreeing to our{' '}
                    <a href="/termsandconditions">Terms and Conditions</a> and{' '}
                    <a href="/termsandconditions#privacy-policy">Privacy Policy</a>.
                </p>

                <div className="self-start space-y-2">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <a>Forgot password?</a>
                </div>
            </form>
        </>

    );
}

export default Login;
