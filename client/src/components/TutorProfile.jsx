// Library which provides functions to handle form submissions and reset its state
import { useForm } from "react-hook-form";
import { showToast } from "../helpers/toast";
import userService from "../services/user";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function TutorProfile() {
    const { hasTutorProfile } = useAuth();
    // Include props where values are edited/used
    // Formstate checks if any form field has been modified from its default value and updates the dirty state, ensuring more responsive UI
    // Provides functions to handle form submission and reset its state.
    const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
        defaultValues: { bio: "", subjects: "", experience: "", availability: "", hourlyRate: "" }
    });

    useEffect(() => {
        // Do not execute if no tutor profile exists as there is no data to gather
        if (!hasTutorProfile) return;
        (async () => {
            try {
                const res = await userService.getTutorProfile();
                // On load, form field values are reset to database values and dirty state is reset
                reset({
                    bio: res.bio,
                    subjects: res.subjects?.join(", "),
                    experience: res.experience_years,
                    availability: res.availability?.join(", "),
                    hourlyRate: `${res.hourly_rate}`
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
                experience_years: parseInt(data.experience, 10), // Parse int in base 10 format
                availability: data.availability.split(",").map(a => a.trim()),
                hourly_rate: parseFloat(data.hourlyRate) || 0
            };

            const res = await userService.updateTutorProfile(updatedProfile);
            showToast(res, "success");

            // Reset form with new values and dirty state is reset
            reset({
                bio: updatedProfile.bio,
                subjects: updatedProfile.subjects.join(", "),
                experience: updatedProfile.experience_years,
                availability: updatedProfile.availability.join(", "),
                hourlyRate: updatedProfile.hourly_rate
            });

        } catch (err) {
            showToast(err.response?.data, "error");
        }
    };

    return (
        <form className="center space-y-6 max-w-xl mx-auto p-8 border border-gray-800 bg-white rounded-2xl shadow-2xl shadow-gray-900/50" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-blue-800 font-bold text-4xl text-center font-title-secondary">Tutor Profile</h1>

            <div>
                <h2 className="text-blue-800 font-bold text-lg">Bio</h2>
                {/* Spread operator used to access all default values */}
                <textarea {...register("bio")} className="block p-2 border border-gray-900 resize-none w-full" placeholder="max 255 characters" rows={3} required />
            </div>

            <div className="flex gap-4 w-full">
                <div className="w-2/6">
                    <h2 className="text-blue-800 font-bold text-lg">Experience (years)</h2>
                    <input {...register("experience")} className="w-full border border-gray-900 p-2" type="number" placeholder="" required />
                </div>
                <div className="w-4/6">
                    <h2 className="text-blue-800 font-bold text-lg">Subjects</h2>
                    <input {...register("subjects")} className="w-full border border-gray-900 p-2" type="text" placeholder="e.g., Maths, English" required />
                </div>
            </div>

            <div>
                <h2 className="text-blue-800 font-bold text-lg">Availability</h2>
                <input {...register("availability")} className="border border-gray-900 p-2 w-full" type="text" placeholder="e.g., Monday 10-12PM" required />
            </div>

            <div>
                <h2 className="text-blue-800 font-bold text-lg">Hourly Rate</h2>
                <div className="flex items-center border border-gray-900 p-2">
                    <span className="text-gray-700">£</span>
                    <input {...register("hourlyRate")} className="w-full border-none focus:outline-none" type="text" required />
                </div>
            </div>
            {/* Button disabled on false value changed */}
            <button className="button button__primary w-full rounded-xl disabled:disabled" type="submit" disabled={!isDirty}>Continue</button>
        </form>
    );

}

export default TutorProfile;