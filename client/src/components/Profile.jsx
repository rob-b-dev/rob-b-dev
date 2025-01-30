import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import userService from '../services/user';

function Profile() {
    const location = useLocation();
    const { user } = location.state || {};

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(user);

    if (!user) {
        return <div>No user data available</div>;
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;  // Targets the input value

        setProfileData({
            ...profileData,
            [name]: value
        });
    };


    const handleSaveClick = async () => {
        setIsEditing(false);
        // const newProfileData = await userService.updateProfle(profileData);
    };


    return (
        <div className='form center space-y-6 max-w-xl mx-auto'>
            <h1 className='text-blue-800 font-bold text-4xl text-center'>Profile</h1>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-user text-xl text-blue-600"></i>
                    <span className="font-semibold">Name:</span>
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        name="Name"
                        value={profileData.Name}
                        onChange={handleChange}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{profileData.Name}</span>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-envelope text-xl text-blue-600"></i>
                    <span className="font-semibold">Email:</span>
                </div>
                {isEditing ? (
                    <input
                        type="email"
                        name="Email"
                        value={profileData.Email}
                        onChange={handleChange}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{profileData.Email}</span>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-key text-xl text-blue-600"></i>
                    <span className="font-semibold">Password:</span>
                </div>
                {isEditing ? (
                    <input
                        type="password"
                        name="Password"
                        value={profileData.Password}
                        onChange={handleChange}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{profileData.Password}</span>
                )}
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                    <button
                        onClick={handleSaveClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;
