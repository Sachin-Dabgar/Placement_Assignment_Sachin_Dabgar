import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiEye,
    FiEyeOff,
    FiMapPin,
    FiLock,
} from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
    });

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
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                formData
            );
            console.log("got response", res);
            if (res.data.success) {
                console.log("inside");
                toast.success("Registration successful");
                navigate("/login");
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
                    Registration Form
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <span className="inline-block p-3 bg-gray-200 rounded-l-full">
                                <FiUser className="text-gray-600" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="py-3 px-4 w-full rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
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
                            Phone Number
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <span className="inline-block p-3 bg-gray-200 rounded-l-full">
                                <FiPhone className="text-gray-600" />
                            </span>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
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
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            Address
                        </label>
                        <div className="flex items-start border border-gray-300 rounded-lg">
                            <span className="inline-block p-3 bg-gray-200 rounded-l-lg">
                                <FiMapPin className="text-gray-600" />
                            </span>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                className="py-3 px-4 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                required
                            />
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

export default Register;
