import { useForm } from "react-hook-form";
import { showToast } from "../helpers/toast";
import userService from "../services/user";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StudentProfile() {
    const { register, handleSubmit, reset, watch, formState: { isDirty } } = useForm({
        defaultValues: { name: "", email: "", password: "********" }
    });

    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await userService.getProfile();
                reset({ name: response.user_name, email: response.user_email, password: "********" });
            } catch (error) {
                console.error(error.response?.data);
            }
        })();
    }, [reset]);

    const handleEditClick = (field) => {
        setIsEditing(field);
        if (field === "password") {
            reset({ ...watch(), password: "" });
        }
    };

    const handleCancelClick = () => {
        setIsEditing(null);
        reset();
    };

    const onSubmit = async (data) => {
        const fieldKey = isEditing;
        const fieldValue = watch(fieldKey);

        const updatedProfile = {
            [`user_${fieldKey}`]: fieldKey === "password" && fieldValue === "********" ? undefined : fieldValue
        };

        try {
            const response = await userService.updateProfile(updatedProfile);
            showToast(response, "success");
            setIsEditing(null);
            reset({ ...data, password: "********" });
        } catch (error) {
            showToast(error.response?.data, "error");
        }
    };

    return (
        <form className="center space-y-6 max-w-xl mx-auto p-8 border border-gray-800 rounded-2xl shadow-2xl shadow-gray-900/50" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-blue-800 font-bold text-4xl text-center font-title-secondary">Student Profile</h1>

            {[{ key: "name", label: "Name", icon: "user" }, { key: "email", label: "Email", icon: "envelope" }, { key: "password", label: "Password", icon: "key" }].map(({ key, label, icon }) => (
                <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <FontAwesomeIcon icon={["fas", icon]} className="text-xl text-blue-600" />
                        <span className="font-semibold">{label}:</span>
                    </div>
                    {isEditing === key ? (
                        <div className="flex space-x-6 items-center">
                            <input
                                type={key === "password" ? "password" : "text"}
                                {...register(key)}
                                placeholder={key === "password" ? "Enter new password" : ""}
                                className="border-2 border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button type="button" onClick={handleCancelClick} className="ml-2 cursor-pointer">
                                <FontAwesomeIcon icon={["fas", "times"]} className="text-red-600" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <span>{key === "password" ? "********" : watch(key)}</span>
                            <button type="button" onClick={() => handleEditClick(key)} className="cursor-pointer">
                                <FontAwesomeIcon icon={["fas", "edit"]} className="text-blue-600" />
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {isEditing && (
                <button className="button button__primary w-full rounded-xl disabled:disabled" type="submit" disabled={!isDirty}>
                    Continue
                </button>
            )}
        </form>
    );
}

export default StudentProfile;
