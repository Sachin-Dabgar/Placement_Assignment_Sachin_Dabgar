// index.js
import "tailwindcss/tailwind.css";
import "./index.css"; // Import the global CSS file
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
