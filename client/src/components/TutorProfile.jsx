import { useForm } from "react-hook-form";
import { showToast } from "../helpers/toast";
import userService from "../services/user";
import { useAuth } from '../hooks/useAuth';
import { useEffect } from "react";

function TutorProfile() {
    const { hasTutorProfile } = useAuth();

    const {
        register,
        handleSubmit,
        reset, // Use reset to set initial values without marking form as dirty
        formState: { isDirty }
    } = useForm({
        defaultValues: {
            bio: "",
            subjects: "",
            experience: "",
            availability: "",
            hourlyRate: ""
        }
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!hasTutorProfile) return;

            try {
                const response = await userService.getTutorProfile();

                // Use reset() instead of setValue() to avoid marking form as dirty
                reset({
                    bio: response.bio,
                    subjects: response.subjects?.join(", "),
                    experience: response.experience_years,
                    availability: response.availability?.join(", "),
                    hourlyRate: `£${response.hourly_rate}`
                });
            } catch (error) {
                console.error(error.response?.data);
            }
        };
        fetchProfile();
    }, [hasTutorProfile, reset]); // Ensure reset is in dependencies

    const parseHourlyRate = (value) => {
        if (value.startsWith("£")) {
            value = value.slice(1);
        }
        return parseFloat(value) || 0;
    };

    const sanitizeInput = (input) => {
        return input
            .replace(/,+/g, ',') // Remove multiple commas
            .split(',')
            .map(subject => subject.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '').toLowerCase())
            .filter(subject => subject !== '');
    };

    const onSubmit = async (data) => {
        try {
            const updatedProfile = {
                bio: data.bio,
                subjects: sanitizeInput(data.subjects),
                experience_years: parseInt(data.experience, 10),
                availability: sanitizeInput(data.availability),
                hourly_rate: parseHourlyRate(data.hourlyRate)
            };

            const response = await userService.updateTutorProfile(updatedProfile);
            showToast(response, 'success');

            // ✅ Reset the form to updated values (marking it as NOT dirty)
            reset({
                bio: updatedProfile.bio,
                subjects: updatedProfile.subjects.join(", "),
                experience: updatedProfile.experience_years,
                availability: updatedProfile.availability.join(", "),
                hourlyRate: `£${updatedProfile.hourly_rate}`
            });

        } catch (error) {
            showToast(error.response?.data, 'error');
        }
    };

    return (
        <form className='form center space-y-6 max-w-xl mx-auto p-6' onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-blue-800 font-bold text-4xl text-center">Tutor Profile</h1>

            <textarea
                {...register("bio")}
                className="block p-2 border border-gray-900 resize-none"
                placeholder="Bio (max 255 characters)"
                rows={3}
                required
            />

            <div className="flex gap-4 w-full">
                <input
                    {...register("subjects")}
                    className="w-4/6 border border-gray-900"
                    type="text"
                    placeholder="Subjects list (example: Maths, English)"
                    required
                />
                <input
                    {...register("experience")}
                    className="w-2/6 border border-gray-900"
                    type="number"
                    placeholder="Experience (years)"
                    required
                />
            </div>

            <input
                {...register("availability")}
                className="border border-gray-900"
                type="text"
                placeholder="Availability list (example: Monday 10-12PM)"
                required
            />

            <input
                {...register("hourlyRate")}
                className="w-2/6 border border-gray-900"
                type="text"
                placeholder="Hourly rate"
                required
            />

            <button className="button button__primary w-full rounded-xl disabled:disabled" type="submit" disabled={!isDirty}>
                Continue
            </button>
        </form>
    );
}

export default TutorProfile;
