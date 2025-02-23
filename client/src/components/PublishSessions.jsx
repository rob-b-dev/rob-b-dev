import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../helpers/toast";
import { useAuth } from '../hooks/useAuth';

function PublishSessions() {
    const { hasTutorProfile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasTutorProfile) {
            showToast('Tutor profile needs creating to access this page', 'error');
            navigate("/tutorprofile");
        }
    }, [hasTutorProfile, navigate]); // Run only when `hasTutorProfile` changes

    return (
        <h1 className="text-center text-6xl font-bold mt-12 mb-5 text-blue-800">Publish Sessions</h1>
    );
}

export default PublishSessions;
