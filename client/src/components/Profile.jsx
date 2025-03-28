import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user";
import { useAuth } from "../hooks/useAuth";
import { showToast } from "../helpers/showToast";

function Profile() {
    const navigate = useNavigate();
    const [editedData, seteditedData] = useState({}); // Stores 
    const [currentData, setcurrentData] = useState({}); // Stores the original data
    const [editField, setEditField] = useState(null); // Currently edited field
    const [loading, setLoading] = useState(true)
    const { isAuthenticated } = useAuth();

    // DEBUG edited data
    useEffect(() => {
        console.log('edited data', editedData)
    }, [editedData]);

    useEffect(() => {
        if (!isAuthenticated) navigate('/home');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const gatherProfile = async () => {
            try {
                // Gather and set current values for user display
                const profileData = await userService.gatherProfile();
                console.log(profileData)
                setcurrentData({
                    fname: profileData.fname,
                    lname: profileData.lname,
                    email: profileData.email,
                    phoneNumber: profileData.phoneNumber,
                    password: "********",
                    postcode: profileData.postcode,
                    addressLine: profileData.addressLine,
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false)
            }
        };
        gatherProfile();
    }, []);

    if (loading) {
        return null
    }

    // Functions for masking email and phone
    const maskEmail = (email) => email.replace(/^(.)(.*)(.@.*)$/, (_, f, m, d) => f + "*".repeat(m.length) + d);
    const maskPhone = (phone) => phone.replace(/\d(?=\d{2})/g, "*");

    const handleEdit = (field, e) => {
        e.preventDefault(); // Prevent form submission
        setEditField(field); // Set field being edited
        // If field is password, set three values in updated data, instead of the default one
        if (field === "password") {
            seteditedData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            seteditedData({ [field]: currentData[field] });
        }
    };

    const handleCancel = (e) => {
        e.preventDefault(); // Prevent form submission
        setEditField(null); // Reset editing field
        seteditedData({}); // Reset changes to data
    };

    const handleChange = (field, value) => {
        seteditedData((prev) => ({
            ...prev, // Spread operator used to preserve the values for the three types of passwords
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit clicked')
        if (!editField) return;
        console.log('submit carried out')

        try {
            if (editField === "password") {
                const { currentPassword, newPassword, confirmPassword } = editedData;
                if (newPassword !== confirmPassword) {
                    showToast('New password fields must match', 'error');
                    return;
                }

                if (!currentPassword || !newPassword || !confirmPassword) {
                    showToast('All fields must be filled', 'error');
                    return;
                }
            }

            await userService.updateProfile(editedData);

            setEditField(null);
            setcurrentData((prev) => ({
                ...prev,
                ...editedData
            }))
            seteditedData({}); // Move this here so it only resets AFTER the update
        } catch (error) {
            console.error("Error updating profile data:", error.message);
        }

    };

    const renderField = (label, field, type, style) => (
        <div className={`flex flex-col space-y-1 mb-2 ${style}`}>
            <h2 className="font-semibold">{label}:</h2>
            {editField === field ? (
                <>
                    {field === "password" ? (
                        <>
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="border border-black text-sm p-1 bg-white rounded-md w-[62%]"
                                value={editedData.currentPassword}
                                onChange={(e) => handleChange("currentPassword", e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="border border-black text-sm p-1 bg-white rounded-md w-[62%] mt-2"
                                value={editedData.newPassword}
                                onChange={(e) => handleChange("newPassword", e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="border border-black text-sm p-1 bg-white rounded-md w-[62%] mt-2"
                                value={editedData.confirmPassword}
                                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                            />
                        </>
                    ) : (
                        <input
                            type={type}
                            className="border border-black text-sm p-1 bg-white rounded-md w-[62%]"
                            value={editedData[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                    )}
                    <div className="flex space-x-4 mt-2">
                        <button className="text-green-500 hover:underline" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="text-red-500 hover:underline" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex justify-between items-center">
                    <p className="text-gray-700">
                        {field === "email" && currentData[field] ? maskEmail(currentData[field]) :
                            field === "phoneNumber" && currentData[field] ? maskPhone(currentData[field]) :
                                currentData[field] || "N/A"}
                    </p>
                    <button className="text-blue-500 hover:underline cursor-pointer" onClick={(e) => handleEdit(field, e)}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );


    return (
        <form className="center-page mt-10">
            <div className="flex flex-col justify-center items-center text-2xl space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <img src="/src/assets/static/logo.png" alt="Logo" className="w-16 cursor-pointer" />
                    <h1 className="font-bold font-title-secondary">Profile</h1>
                </div>

                <div className="border border-black text-sm p-6 bg-white rounded-3xl wrapper min-h-[250px] mb-4">
                    {renderField("First Name", "fname", "text")}
                    {renderField("Last Name", "lname", "text")}
                    {renderField("Email", "email", "email")}
                    {renderField("Phone Number", "phoneNumber", "tel")}
                    {renderField("Password", "password", "password")}
                    {renderField("Address Line", "addressLine", "text", 'mt-10')}
                    {renderField("Postcode", "postcode", "text")}
                </div>
            </div>
        </form>
    );
}

export default Profile;
