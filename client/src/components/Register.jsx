import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();  // Access the register function from context

    const handleRegisterClick = async (e) => {
        e.preventDefault();
        register({
            name,
            email,
            password
        });
        navigate("/");
    };

    return (
        <>
            <form onSubmit={handleRegisterClick}>
                <div>
                    <h2>Welcome! Register here</h2>

                    {/* Name input */}
                    <div>
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            required
                        />

                        {/* Email input */}
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            required
                        />

                        {/* Password input */}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            required
                        />

                        {/* Show password checkbox */}
                        <div>
                            <input
                                type="checkbox"
                                id="password"
                                onClick={() => setShowPassword((prev) => !prev)}
                            />
                            <label htmlFor="password">Show Password</label>
                        </div>
                    </div>

                    {/* Continue button */}
                    <button>
                        Continue
                    </button>

                </div>

                {/* Terms and conditions */}
                <p>
                    By signing up, you are agreeing to our{' '}
                    <a href="/termsandconditions">Terms and Conditions</a> and{' '}
                    <a href="/termsandconditions#privacy-policy">Privacy Policy</a>.
                </p>

                {/* Sign-in link */}
                <p>
                    Have an account? <a href="/login">Sign in</a>
                </p>
            </form>
        </>
    );
}

export default Register;
