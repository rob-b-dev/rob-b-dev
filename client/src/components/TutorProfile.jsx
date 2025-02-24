import { useForm } from "react-hook-form";
import { showToast } from "../helpers/toast";
import userService from "../services/user";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function TutorProfile() {
    const { hasTutorProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
        defaultValues: { bio: "", subjects: "", experience: "", availability: "", hourlyRate: "" }
    });

    useEffect(() => {
        if (!hasTutorProfile) return;
        (async () => {
            try {
                const res = await userService.getTutorProfile();
                reset({
                    bio: res.bio,
                    subjects: res.subjects?.join(", "),
                    experience: res.experience_years,
                    availability: res.availability?.join(", "),
                    hourlyRate: `£${res.hourly_rate}`
                });
            } catch (err) {
                console.error(err.response?.data);
            }
        })();
    }, [hasTutorProfile, reset]);

    const onSubmit = async (data) => {
        try {
            const updatedProfile = {
                bio: data.bio,
                subjects: data.subjects.split(",").map(s => s.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '').toLowerCase()).filter(Boolean),
                experience_years: parseInt(data.experience, 10),
                availability: data.availability.split(",").map(a => a.trim()).filter(Boolean),
                hourly_rate: parseFloat(data.hourlyRate.replace("£", "")) || 0
            };
            const res = await userService.updateTutorProfile(updatedProfile);
            showToast(res, "success");
            reset({ ...updatedProfile, subjects: updatedProfile.subjects.join(", "), availability: updatedProfile.availability.join(", "), hourlyRate: `£${updatedProfile.hourly_rate}` });
        } catch (err) {
            showToast(err.response?.data, "error");
        }
    };

    return (
        <form className="form center space-y-6 max-w-xl mx-auto p-6" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-blue-800 font-bold text-4xl text-center">Tutor Profile</h1>
            <textarea {...register("bio")} className="block p-2 border border-gray-900 resize-none" placeholder="Bio (max 255 characters)" rows={3} required />
            <div className="flex gap-4 w-full">
                <input {...register("subjects")} className="w-4/6 border border-gray-900" type="text" placeholder="Subjects (e.g., Maths, English)" required />
                <input {...register("experience")} className="w-2/6 border border-gray-900" type="number" placeholder="Experience (years)" required />
            </div>
            <input {...register("availability")} className="border border-gray-900" type="text" placeholder="Availability (e.g., Monday 10-12PM)" required />
            <input {...register("hourlyRate")} className="w-2/6 border border-gray-900" type="text" placeholder="Hourly rate" required />
            <button className="button button__primary w-full rounded-xl disabled:disabled" type="submit" disabled={!isDirty}>Continue</button>
        </form>
    );
}

export default TutorProfile;
