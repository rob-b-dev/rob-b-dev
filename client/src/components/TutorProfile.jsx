// useForm is a React Hook that simplifies form handling by managing state, validation, and submission.
import { useForm } from "react-hook-form";
import { showToast } from "../helpers/toast";
import userService from "../services/user";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function TutorProfile() {
    const { hasTutorProfile } = useAuth();
    // formState tracks whether any form field has been modified from its default value, updating the dirty state for UI responsiveness.
    // The useForm hook provides:
    // - register: Connects input fields to React Hook Form's state management (useForm)
    // - handleSubmit: Handles form submission logic.
    // - reset: Resets the form fields to their default values.
    const { register, handleSubmit, reset, watch, formState: { isDirty } } = useForm({
        defaultValues: { bio: "", subjects: "", experience: "", availability: "", hourlyRate: "" } // Initial form values
    });

    console.log("Current Bio:", watch("bio"));

    useEffect(() => {
        // Exit early if the tutor profile doesn't exist (no data to fetch)
        if (!hasTutorProfile) return;
        (async () => {
            try {
                const res = await userService.getTutorProfile();
                // Update the form with the retrieved data and reset the dirty state
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
        <form className="center space-y-6 max-w-xl mx-auto p-8 border border-gray-800 rounded-2xl shadow-2xl shadow-gray-900/50" onSubmit={handleSubmit(onSubmit)}>
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
                    <input {...register("subjects")} className="w-full border border-gray-900 p-2 " type="text" placeholder="e.g. Maths, English" required />
                </div>
            </div>

            <div>
                <h2 className="text-blue-800 font-bold text-lg">Availability</h2>
                <input {...register("availability")} className="border border-gray-900 p-2 w-full" type="text" placeholder="e.g. Monday 10-12PM" required />
            </div>

            <div>
                <h2 className="text-blue-800 font-bold text-lg">Hourly Rate</h2>
                <div className="flex items-center border border-gray-900 p-2">
                    <span>£</span>
                    <input {...register("hourlyRate")} className="w-full border-none focus:outline-none" type="text" required />
                </div>
            </div>
            {/* Button disabled on false value changed */}
            <button className="button button__primary w-full rounded-xl disabled:disabled" type="submit" disabled={!isDirty}>Continue</button>
        </form>
    );

}

export default TutorProfile;