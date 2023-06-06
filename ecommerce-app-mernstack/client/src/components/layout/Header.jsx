import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { HiShoppingBag } from "react-icons/hi";
import { useAuth } from "../../context/auth";

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [auth, setAuth] = useAuth();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
    };

    return (
        <>
            <nav className="bg-gray-800">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between py-4 px-2">
                        <NavLink
                            to="/"
                            className="text-white font-bold text-2xl uppercase"
                        >
                            <div className="flex items-center gap-1">
                                <HiShoppingBag size={30} />
                                <span>Ecommerce</span>
                            </div>
                        </NavLink>
                        <div className="hidden sm:flex">
                            <ul className="flex gap-4">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-white text-lg uppercase border-b-2 py-1 border-b-slate-100"
                                                : "text-white text-lg uppercase"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/category"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-white text-lg uppercase border-b-2 py-1 border-b-slate-100"
                                                : "text-white text-lg uppercase"
                                        }
                                    >
                                        Category
                                    </NavLink>
                                </li>
                                {!auth?.user ? (
                                    <>
                                        <li>
                                            <NavLink
                                                to="/register"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "text-white text-lg uppercase border-b-2 py-1 border-b-slate-100"
                                                        : "text-white text-lg uppercase"
                                                }
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "text-white text-lg uppercase border-b-2 py-1 border-b-slate-100"
                                                        : "text-white text-lg uppercase"
                                                }
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li onClick={handleLogout}>
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "text-white text-lg uppercase border-b-2 py-1 border-b-slate-100"
                                                        : "text-white text-lg uppercase"
                                                }
                                            >
                                                Logout
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <NavLink
                                        to="/cart"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-white text-lg uppercase border-b-2 py-1 border-b-slate-100"
                                                : "text-white text-lg uppercase"
                                        }
                                    >
                                        <div className="flex items-center gap-1">
                                            <BsFillCartFill />
                                            <span>(0)</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="relative sm:hidden">
                            <button
                                onClick={toggleCollapse}
                                className="flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isCollapsed ? <FaTimes /> : <FaBars />}
                            </button>

                            {isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-10 right-0 w-40 p-2 mt-2 bg-white rounded-md shadow-lg"
                                >
                                    <ul className="space-y-2">
                                        <li onClick={toggleCollapse}>
                                            <NavLink
                                                to={"/"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-4 py-2 text-white bg-gray-800 "
                                                        : "block px-4 py-2 text-gray-800 "
                                                }
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li onClick={toggleCollapse}>
                                            <NavLink
                                                to={"/category"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-4 py-2 text-white bg-gray-800 "
                                                        : "block px-4 py-2 text-gray-800 "
                                                }
                                            >
                                                Category
                                            </NavLink>
                                        </li>
                                        <li onClick={toggleCollapse}>
                                            <NavLink
                                                to={"/register"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-4 py-2 text-white bg-gray-800 "
                                                        : "block px-4 py-2 text-gray-800 "
                                                }
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                        <li onClick={toggleCollapse}>
                                            <NavLink
                                                to={"/login"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-4 py-2 text-white bg-gray-800 "
                                                        : "block px-4 py-2 text-gray-800 "
                                                }
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                        <li onClick={toggleCollapse}>
                                            <NavLink
                                                to={"/cart"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-4 py-2 text-white bg-gray-800 "
                                                        : "block px-4 py-2 text-gray-800 "
                                                }
                                            >
                                                <div className="flex items-center gap-1">
                                                    <BsFillCartFill />
                                                    <span>(0)</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
