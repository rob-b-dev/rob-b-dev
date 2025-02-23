import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Register() {
    const navigate = useNavigate();
    const { isAuthenticated, register } = useAuth(); // Access the register function and authentication state from context

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterClick = async (e) => {
        e.preventDefault();

        // Register the user and wait for the process to finish
        await register({
            name,
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
        <form onSubmit={handleRegisterClick} className="form center">
            <div className="space-y-6 text-center w-4/5 mx-auto">
                {/* Heading */}
                <h1 className="text-blue-800 font-bold text-4xl">
                    Welcome! Register here
                </h1>
                <div className="space-y-6">
                    {/* Form Inputs */}

                    {/* Name Input */}
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        required
                        className="w-full rounded-xl"
                    />

                    {/* Email Input */}
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        required
                        className="w-full rounded-xl"
                    />

                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        required
                        className="w-full rounded-xl"
                    />

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="showPassword"
                            onClick={() => setShowPassword((prev) => !prev)}
                        />
                        <label htmlFor="showPassword">Show Password</label>
                    </div>

                    <button
                        type="submit"
                        className="button button__primary w-full rounded-xl"
                    >
                        Continue
                    </button>
                </div>

                <div className="text-left space-y-4">
                    <p>
                        By signing up, you are agreeing to our{' '}
                        <a href="/termsandconditions" className="text-blue-800 underline">Terms and Conditions</a> and{' '}
                        <a href="/termsandconditions#privacy-policy" className="text-blue-800 underline">Privacy Policy</a>.
                    </p>
                    <p>
                        Have an account?{' '}
                        <a href="/login" className="text-blue-800 underline">Sign in</a>
                    </p>
                </div>
            </div>
        </form>
    );
}

export default Register;
