/* eslint-disable react/prop-types */
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";
import logo from '../../assets/logo.png'

const Login = ({title}) => {
    const { signIn } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center">
            <Helmet>
                <title>{title || "Signin | furEverHome"}</title>
            </Helmet>

            <div className="text-center my-4">
                <img className="w-16 mx-auto" src={logo} alt="furEverHome" />
                <Link to="/" className="text-3xl md:text-4xl font-bold">
                    furEverHome
                </Link>
            </div>

            <div className="my-6 w-full md:w-1/2 lg:w-1/3 mx-auto bg-white border border-gray-200 shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
                <p className="text-sm text-center text-gray-500 mb-4">
                    Log in to access your account and enjoy our services.
                </p>
                <SocialLogin />
                <div className="my-6 border-t border-dashed border-gray-300"></div>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <Label htmlFor="email1" value="Your Email" className="mb-2 text-gray-700 font-medium" />
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
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password1" value="Your Password" className="mb-2 text-gray-700 font-medium" />
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
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <Button type="submit" color="indigo" size="lg" className="w-full">
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
        </div>
    );
};

export default Login;
