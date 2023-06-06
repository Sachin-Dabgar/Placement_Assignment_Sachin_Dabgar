// Dashboard.js
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Dashboard = () => {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    const themeClass = isDarkTheme ? "dark" : "";

    return (
        <div
            className={`flex flex-col items-center justify-center h-screen transition-colors ${themeClass}`}
        >
            <h1 className="text-3xl mb-4">Dashboard</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleTheme}
            >
                Toggle Theme
            </button>
        </div>
    );
};

export default Dashboard;
