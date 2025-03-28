import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticated, login } = useAuth();  // Get the login function from context - stored globally
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        // Login call
        await login({
            email,
            password
        });
    };

    // Redirect to home page once the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <form onSubmit={handleSubmitLogin} className="form center">
            <div className="space-y-6 text-center w-4/5 mx-auto">
                {/* Heading */}
                <h2 className="text-blue-800 font-extrabold text-4xl">
                    Login
                </h2>
                <div className="space-y-6">

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        id="email"
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-xl"
                    />

                    {/* Password Input */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        id="password"
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-xl"
                    />

                    {/* Show Password and Remember Me */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="showPassword"
                                onClick={() => setShowPassword((prev) => !prev)}
                            />
                            <label htmlFor="showPassword">Show Password</label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="button button__primary w-full rounded-xl"
                        type="submit"
                    >
                        Continue
                    </button>
                </div>

                {/* Bottom Content */}
                <div className="text-left space-y-4">
                    <p>
                        By continuing, you are agreeing to our{' '}
                        <a href="/termsandconditions" className="text-blue-800 underline">Terms and Conditions</a> and{' '}
                        <a href="/termsandconditions#privacy-policy" className="text-blue-800 underline">Privacy Policy</a>.
                    </p>
                    <p>
                        Don&apos;t have an account?{' '}
                        <a href="/register" className="text-blue-800 underline">Register</a>
                    </p>
                    <a href="#" className="text-blue-800 underline">Forgot password?</a>
                </div>

            </div>

        </form>
    );
}

export default Login;
