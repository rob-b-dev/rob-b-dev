import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}", // Adjust based on your project structure
    ],
    theme: {
        extend: {},
    },
    plugins: [forms, aspectRatio, lineClamp],
};
