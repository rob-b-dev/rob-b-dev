import { useState, useEffect } from "react"
import { showToast } from "../helpers/toast"
import userService from "../services/user"

function TutorProfile() {
    const [bio, setBio] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [experience, setExperience] = useState(null)
    const [availability, setAvailability] = useState(null)
    const [hourlyRate, setHourlyRate] = useState(null);

    useEffect(() => {
        const gatherProfile = async () => {
            try {
                const response = await userService.getTutorProfile();
                setBio(response.bio);
                setSubjects(response.subjects?.join(", "));
                setExperience(response.experience_years);
                setAvailability(response.availability?.join(", "));
                setHourlyRate(`£${response.hourly_rate}`);
            } catch (error) {
                console.error(error.response?.data);
            }
        };
        gatherProfile();
    }, []);

    const sanitizeInput = (input) => {
        return input
            .replace(/,+/g, ',')   // Remove multiple commas
            .split(',')
            .map(subject =>
                subject
                    .trim()
                    .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '') // Remove non-alphabetic at start & end
                    .toLowerCase() // Convert to lowercase
            )
            .filter(subject => subject !== ''); // Remove empty values
    };

    const handleHourlyRateChange = (e) => {
        let value = e.target.value;

        // Ensure it always starts with "£"
        if (!value.startsWith("£")) {
            value = "£" + value.replace(/£/g, ""); // Remove any extra £
        }

        setHourlyRate(value);
    };

    const handleFocus = () => {
        if (hourlyRate === "") {
            setHourlyRate("£"); // Add £ when clicked
        }
    };

    const handleBlur = () => {
        if (hourlyRate === "£") {
            setHourlyRate(""); // Remove £ if nothing was entered
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await userService.updateTutorProfile({
                bio,
                subjects: sanitizeInput(subjects),
                experience_years: parseInt(experience, 10), // Parse int in base 10
                availability: sanitizeInput(availability),
                hourly_rate: hourlyRate
            })
            showToast(response, 'success')
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    }


    return (
        <div className='form center space-y-6 max-w-xl mx-auto'>
            <h1 className="text-blue-800 font-bold text-4xl flex justify-center items-center text-center w-full">Tutor Profile</h1>


            <textarea
                className="block p-2 transition-all duration-300 ease-in-out border border-gray-900 resize-none overflow-auto"
                placeholder="Bio (max 255 characters)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                required
            />

            <div className="flex gap-4 w-full">
                <input className="w-4/6 transition-all duration-300 ease-in-out border border-gray-900"
                    type="text"
                    placeholder="Subjects list (example: Maths, English)"
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    required
                />
                <input className="w-2/6 transition-all duration-300 ease-in-out border border-gray-900"
                    type="text"
                    placeholder="Experience (years)"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                />
            </div>

            <input className="transition-all duration-300 ease-in-out border border-gray-900" type="text"
                placeholder="Availability list (example: Monday 10-12PM)"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                required
            />

            <input className="w-2/6 transition-all duration-300 ease-in-out border border-gray-900" type="text"
                placeholder="Hourly rate"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
            />


            <button
                className="button button__primary w-full rounded-xl"
                type="submit"
                onClick={handleSubmit}
            >
                Continue
            </button>

        </div>
    )

}

export default TutorProfile