import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const navigateBasedOnRole = (role) => {
        const normalizedRole = role?.toUpperCase();
        switch(normalizedRole) {
            case "CUSTOMER":
                navigate("/restaurants_user", { replace: true });
                break;
            case "RESTAURANT_ADMIN":
                navigate("/restaurants", { replace: true });
                break;
            default:
                console.warn("Unknown role:", role);
                message.warning("Your account type doesn't have an assigned dashboard");
                navigate("/", { replace: true });
        }
    };

    const fetchAndNavigate = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/auth/users/${userId}`, {
                withCredentials: true
            });
            
            if (userResponse.data?.role) {
                navigateBasedOnRole(userResponse.data.role);
            } else {
                throw new Error("User role not found in profile");
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            message.error("Couldn't load your profile information");
            navigate("/", { replace: true });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Input validation
        if (!email || !password) {
            message.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            message.error("Please enter a valid email address");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "/api/auth/login",
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    timeout: 10000,
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                const responseData = response.data;
                
                // Case 1: Response has nested user object
                if (responseData.user && responseData.user.id) {
                    const userData = responseData.user;
                    localStorage.setItem("currentUser", JSON.stringify(userData));

                    if (rememberMe) {
                        localStorage.setItem("rememberedEmail", email);
                    } else {
                        localStorage.removeItem("rememberedEmail");
                    }

                    message.success("Login Successful!");
                    
                    if (userData.role) {
                        navigateBasedOnRole(userData.role);
                        return;
                    }

                    await fetchAndNavigate(userData.id);
                    return;
                }
                
                // Case 2: Response is the user object directly
                if (responseData.id) {
                    localStorage.setItem("currentUser", JSON.stringify(responseData));

                    if (rememberMe) {
                        localStorage.setItem("rememberedEmail", email);
                    }

                    message.success("Login Successful!");

                    if (responseData.role) {
                        navigateBasedOnRole(responseData.role);
                        return;
                    }

                    await fetchAndNavigate(responseData.id);
                    return;
                }

                throw new Error("Unexpected response format from server");
            }
        } catch (error) {
            console.error("Login error:", {
                error: error,
                response: error.response?.data
            });

            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    message.error("Request timeout. Please try again.");
                } else if (error.response) {
                    const errorMessage = error.response.data?.message || 
                                      error.response.data?.error ||
                                      error.response.statusText ||
                                      "Login failed";
                    message.error(errorMessage);
                } else if (error.request) {
                    message.error("No response from server. Check your connection.");
                } else {
                    message.error("Login setup failed: " + error.message);
                }
            } else {
                message.error(error.message || "An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    return (
        
        <div className="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
            <center>
            <div className="bg-white lg:w-6/12 md:w-7/12 w-8/12 shadow-3xl rounded-xl relative">
                <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                </div>
                <form className="p-12 md:p-24" onSubmit={handleLogin}>
                    <h2 className="text-center text-2xl font-bold mb-6">Restaurant Owner Login</h2>
                    <p className="text-center text-gray-600 mb-8">Sign in to manage your restaurant</p>

                    <div className="flex items-center text-lg mb-6 md:mb-8">
                        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <input 
                            type="email" 
                            id="email"
                            className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" 
                            placeholder="owner@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                        </svg>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full pr-10" 
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            minLength="6"
                        />
                        <span 
                            className="absolute right-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <Icon
                                path={showPassword ? mdiEyeOff : mdiEye}
                                size={1}
                                color="#666"
                                title={showPassword ? "Hide password" : "Show password"}
                            />
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot Password?
                        </a>
                    </div>

                    <button 
                        type="submit"
                        className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : "Login"}
                    </button>

                    <p className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
            </center>
        </div>
    );
}

export default LoginPage;