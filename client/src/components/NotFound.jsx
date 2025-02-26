import { useEffect, useState } from "react";

function NotFound() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
    }, []);

    return (
        <div
            className={`flex items-center justify-center gap-4 text-6xl font-bold min-h-screen 
                ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
        >
            <h1 className="text-6xl font-title-secondary">404</h1>
            <div className={`w-[3px] h-[80px] ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
            <h1 className="text-3xl font-title-secondary">Page Not Found</h1>
        </div>
    );
}

export default NotFound;
