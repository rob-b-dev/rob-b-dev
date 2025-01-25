import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import the useAuth hook
import Header from './Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();  // Get the login function from context - stored globally
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        login({
            email,
            password
        });
        navigate("/home");
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
                    <p>Don&apos;t have an account? <a href="/register">Register</a></p>
                    <a>Forgot password?</a>
                </div>
            </form>
        </>

    );
}

export default Login;
