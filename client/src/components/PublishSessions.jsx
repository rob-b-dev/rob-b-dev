import { useEffect, useState } from "react"
import userService from "../services/user";
import { useNavigate } from "react-router-dom";
import { showToast } from "../helpers/toast";

function PublishSessions() {
    const [profileShow, setProfileShow] = useState(null)
    const navigate = useNavigate()

    // Check for current tutor profile
    useEffect(() => {
        const checkProfile = async () => {
            try {
                const response = await userService.checkTutorProfile();
                if (response.ok) {
                    setProfileShow(false); // Don't prompt tutor profile
                }
            } catch (error) {
                setProfileShow(true); // Prompt tutor profile
                showToast(error.response?.data, 'error');
            }
        };

        checkProfile();

    }, []);

    // If tutor profile doesnt exist, prompt it for completion
    if (profileShow) {
        navigate("/tutorprofile")
    }

    return (
        <h1 className="text-center text-6xl font-bold mt-12 mb-5 text-blue-800">Publish Sessions</h1>
    )
}

export default PublishSessions