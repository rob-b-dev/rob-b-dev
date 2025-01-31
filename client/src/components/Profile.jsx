import { useEffect, useState } from 'react';
import userService from '../services/user';
import './NotFound';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const gatherProfile = async () => {
            try {
                const response = await userService.getProfile();
                setProfileData({
                    user_name: response.user_name,
                    user_email: response.user_email,
                    user_password: response.user_password,
                });
            } catch (error) {
                console.error(error.response?.data);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        gatherProfile();
    }, []);

    // Handle case where data is loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle case where user data is not available
    if (!profileData) {
        return <div>No user data available</div>;
    }

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Targets the input value

        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    // Save the updated profile data
    const handleSaveClick = async () => {
        setIsEditing(false);
        try {
            const updatedProfile = await userService.updateProfile({
                Name: profileData.user_name,
                Email: profileData.user_email,
                Password: profileData.user_password,
            });
            console.log("Profile Data on Save:", updatedProfile); // Log profile data on save
        } catch (error) {
            console.error("Error updating profile:", error);
        }
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
                        name="user_name"
                        value={profileData.user_name}
                        onChange={handleChange}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{profileData.user_name}</span>
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
                        name="user_email"
                        value={profileData.user_email}
                        onChange={handleChange}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{profileData.user_email}</span>
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
                        name="user_password"
                        value={profileData.user_password}
                        onChange={handleChange}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{profileData.user_password}</span>
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
