import React, { useState } from "react";


import Layout from "../../components/layout/Layout";
import { FiMail, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [auth, setAuth] = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form submission or validation here
        try {
            console.log("form data is", formData);
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                formData
            );
            console.log("got response", res);
            if (res.data.success) {
                console.log("inside");
                toast.success("Registration successful");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">
                    Login Form
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <span className="inline-block p-3 bg-gray-200 rounded-l-full">
                                <FiMail className="text-gray-600" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="py-3 px-4 w-full rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <span className="inline-block p-3 bg-gray-200 rounded-l-full">
                                <FiLock className="text-gray-600" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="py-3 px-4 w-full rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                className="p-3 bg-gray-200 rounded-r-full focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="text-gray-600" />
                                ) : (
                                    <FiEye className="text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
