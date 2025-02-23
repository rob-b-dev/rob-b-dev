import { useEffect, useState } from 'react';
import userService from '../services/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showToast } from '../helpers/toast';

function StudentProfile() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [originalName, setOriginalName] = useState(null);
    const [originalEmail, setOriginalEmail] = useState(null);
    const [originalPassword, setOriginalPassword] = useState(null);
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const gatherProfile = async () => {
            try {
                const response = await userService.getProfile();
                setName(response.user_name);
                setEmail(response.user_email);
                setPassword(response.user_password);
                setOriginalName(response.user_name);
                setOriginalEmail(response.user_email);
                setOriginalPassword(response.user_password)
            }
            catch (error) {
                console.error(error.response?.data);
                return <div>No user data available</div>

            } finally {
                setLoading(false);
            }
        };
        gatherProfile();
    }, []);

    if (loading) {
        return <div className='text-white'>Loading...</div>;
    }

    const handleEditClick = (field) => {
        setIsEditing(field);
    };

    const handleSaveClick = async () => {
        setIsEditing(null);

        let value;

        if (isEditing === 'user_name') {
            value = name;
        } else if (isEditing === 'user_email') {
            value = email;
        } else if (isEditing === 'user_password') {
            value = password;
        }

        if (value === originalName || value === originalEmail || value === originalPassword) {
            value = undefined
        }

        const updatedProfile = { [isEditing]: value };
        console.log('sent data', updatedProfile)
        try {
            const response = await userService.updateProfile(updatedProfile);
            showToast(response, 'success')
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    };
    const maskEmail = (email) => {
        return email.replace(/(.{3}).*(@.*)/, "$1***$2");
    };

    return (
        <div className='form center space-y-6 max-w-xl mx-auto'>
            <h1 className='text-blue-800 font-bold text-4xl text-center'>Student Profile</h1>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={['fas', 'user']} className="text-xl text-blue-600" />
                    <span className="font-semibold">Name:</span>
                </div>
                {isEditing === 'user_name' ? (
                    <>
                        <input
                            type="text"
                            name="user_name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-blue-500 rounded px-2 py-1"
                        />
                        <button onClick={handleSaveClick} className="ml-2 cursor-pointer">
                            <FontAwesomeIcon icon={['fas', 'check']} />
                        </button>
                    </>
                ) : (
                    <div className='space-x-2'>
                        <span>{name}</span>
                        <button onClick={() => handleEditClick('user_name')} className='cursor-pointer'>
                            <FontAwesomeIcon icon={['fas', 'edit']} />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={['fas', 'envelope']} className="text-xl text-blue-600" />
                    <span className="font-semibold">Email:</span>
                </div>
                {isEditing === 'user_email' ? (
                    <>
                        <input
                            type="email"
                            name="user_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-blue-500 rounded px-2 py-1"
                        />
                        {/* When editing apply a check icon to ensure submition */}
                        <button onClick={handleSaveClick} className="ml-2 cursor-pointer">
                            <FontAwesomeIcon icon={['fas', 'check']} />
                        </button>
                    </>
                ) : (
                    <div className='space-x-2'>
                        <span>{maskEmail(email)}</span>
                        <button onClick={() => handleEditClick('user_email')} className='cursor-pointer'>
                            <FontAwesomeIcon icon={['fas', 'edit']} />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={['fas', 'key']} className="text-xl text-blue-600" />
                    <span className="font-semibold">Password:</span>
                </div>
                {isEditing === 'user_password' ? (
                    <>
                        <input
                            type="password"
                            name="user_password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-blue-500 rounded px-2 py-1"
                        />
                        <button onClick={handleSaveClick} className="ml-2 cursor-pointer" >
                            <FontAwesomeIcon icon={['fas', 'check']} />
                        </button>
                    </>
                ) : (
                    <div className='space-x-2'>
                        <span>********</span>
                        <button onClick={() => handleEditClick('user_password')} className='cursor-pointer'>
                            <FontAwesomeIcon icon={['fas', 'edit']} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentProfile;
