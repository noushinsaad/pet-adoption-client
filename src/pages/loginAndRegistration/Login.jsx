/* eslint-disable react/prop-types */
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";
import logo from '../../assets/logo.png';
import { useDarkModeContext } from "../../providers/DarkModeProvider";

const Login = ({ title }) => {
    const { darkMode } = useDarkModeContext();
    const { signIn } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: `${user.displayName} Logged in successfully`,
                    icon: "success",
                    timer: 2000,
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    timer: 3000,
                });
            });
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 
            ${darkMode === "dark" ? "bg-gray-900 text-gray-300" : "bg-gradient-to-br from-green-50 to-green-100 text-gray-800"}
        `}>
            <Helmet>
                <title>{title || "Signin | furEverHome"}</title>
            </Helmet>

            <div className="text-center my-4">
                <img className="w-16 mx-auto" src={logo} alt="furEverHome" />
                <Link to="/" className="text-3xl md:text-4xl font-bold">
                    furEverHome
                </Link>
            </div>

            <div className={`my-6 w-full md:w-1/2 lg:w-1/3 mx-auto p-8 rounded-lg shadow-lg border
                ${darkMode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
            `}>
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
                <p className="text-sm text-center mb-4">
                    Log in to access your account and enjoy our services.
                </p>
                <SocialLogin />
                <div className={`my-6 border-t border-dashed transition-all duration-300 
                    ${darkMode === "dark" ? "border-gray-600" : "border-gray-300"}
                `}></div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="email1" value="Your Email" className="mb-2 font-medium" />
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="Your Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@]+@[^@]+\.[^@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        shadow
                        className={`w-full p-2 rounded-md border transition-colors duration-300 
                                ${darkMode === "dark"
                                ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"}
                            `}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <Label htmlFor="password1" value="Your Password" className="mb-2 font-medium" />
                    <TextInput
                        id="password1"
                        type="password"
                        placeholder="Your Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        shadow
                        className={`w-full p-2 rounded-md border transition-colors duration-300 
                                ${darkMode === "dark"
                                ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"}
                            `}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <Button
                    type="submit"
                    color="indigo"
                    size="lg"
                    className={`w-full transition duration-300 
                            ${darkMode === "dark"
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-indigo-500 hover:bg-indigo-600"}
                        `}
                >
                    Log In
                </Button>
            </form>
            <p className="font-semibold text-center mt-6">
                Don’t have an account?{" "}
                <Link to="/register" className="text-indigo-600 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
        </div >
    );
};

export default Login;
