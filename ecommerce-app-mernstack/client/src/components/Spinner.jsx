import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        count === 0 &&
            navigate("/login", {
                state: location.pathname,
            });
        return () => clearInterval(interval);
    }, [count, navigate, location]);

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            <h1 className="text-3xl">Please Login ... </h1>
            <h1 className="text-xl">
                Redirecting to you in {count} second ...{" "}
            </h1>
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
