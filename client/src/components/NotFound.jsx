import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NotFound() {
    // Sets bool for dark mode toggle
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");


    useEffect(() => {
        setIsDarkMode(localStorage.getItem("theme") === "dark");

        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        }
    }, [isDarkMode]);



    return (
        <div className={`flex items-center justify-center min-h-screen 
            ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            <div className="relative flex flex-col items-start">
                <a className="absolute -inset-x-1/2 top-[-8rem] flex items-center gap-2" href='/'>
                    <FontAwesomeIcon icon={["fas", "arrow-left-long"]} className="text-2xl" />
                    <span className="text-lg font-semibold">Back to Home Page</span>
                </a>
                <div className="flex items-center gap-4">
                    <h1 className="text-6xl font-title-secondary">404</h1>
                    <div className={`w-[3px] h-[80px] ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
                    <h1 className="text-3xl font-title-secondary">Page Not Found</h1>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
