// App.js
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Dashboard from "./Dashboard";

const App = () => {
    return (
        <ThemeProvider>
            <Dashboard />
        </ThemeProvider>
    );
};

export default App;
