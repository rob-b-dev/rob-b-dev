import { useEffect, useState } from 'react';
import userService from '../services/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showToast } from '../helpers/toast';

function StudentProfile() {
    const [profile, setProfile] = useState({ name: '', email: '', password: '' });
    const [originalProfile, setOriginalProfile] = useState({});
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await userService.getProfile();
                setProfile({
                    name: response.user_name,
                    email: response.user_email,
                    password: response.user_password
                });
                setOriginalProfile(response);
            } catch (error) {
                console.error(error.response?.data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div className='text-white'>Loading...</div>;

    const handleEditClick = (field) => setIsEditing(field);
    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const maskEmail = (email) => email.replace(/(.{3}).*(@.*)/, "$1***$2");

    const handleSaveClick = async () => {
        setIsEditing(null);
        if (profile[isEditing] === originalProfile[isEditing]) return;

        try {
            const response = await userService.updateProfile({ [isEditing]: profile[isEditing] });
            showToast(response, 'success');
        } catch (error) {
            showToast(error.response?.data, 'error');
        }
    };

    const renderField = (label, field, type = 'text', maskFn) => (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={['fas', field === 'password' ? 'key' : field === 'email' ? 'envelope' : 'user']} className="text-xl text-blue-600" />
                <span className="font-semibold">{label}:</span>
            </div>
            {isEditing === field ? (
                <>
                    <input type={type} name={field} value={profile[field]} onChange={handleChange} className="border-2 border-blue-500 rounded px-2 py-1" />
                    <button onClick={handleSaveClick} className="ml-2 cursor-pointer">
                        <FontAwesomeIcon icon={['fas', 'check']} />
                    </button>
                </>
            ) : (
                <div className='space-x-2'>
                    <span>{maskFn ? maskFn(profile[field]) : profile[field]}</span>
                    <button onClick={() => handleEditClick(field)} className='cursor-pointer'>
                        <FontAwesomeIcon icon={['fas', 'edit']} />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className='form center space-y-6 max-w-xl mx-auto'>
            <h1 className='text-blue-800 font-bold text-4xl text-center'>Student Profile</h1>
            {renderField("Name", "name")}
            {renderField("Email", "email", "email", maskEmail)}
            {renderField("Password", "password", "password", () => "********")}
        </div>
    );
}

export default StudentProfile;
