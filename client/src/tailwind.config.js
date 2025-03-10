import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}", // Adjust based on your project structure
    ],
    darkMode: 'class', // Enables manual dark mode using a class
    theme: {
        extend: {},
    },
    plugins: [forms, aspectRatio, lineClamp], // Plugins
    // Forms allows for default form styles making styling easier
    // Aspect ratio allows for 
};
