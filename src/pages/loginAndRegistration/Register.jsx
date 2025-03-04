/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo.png";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const Register = ({ title }) => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" },
        });
        const photoUrl = res.data.data.display_url;

        createUser(data.email, data.password)
            .then((result) => {
                updateUserProfile(data.name, photoUrl)
                    .then(() => {
                        const userInfo = { name: data.name, email: data.email, photoUrl };
                        axiosPublic.post("/users", userInfo).then((res) => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "User Created Successfully",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                navigate("/");
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text: "User already exists",
                                    icon: "error",
                                    timer: 3000,
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        Swal.fire({ title: "Error", text: error.message, icon: "error", timer: 3000 });
                    });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center">
            <Helmet>
                <title>{title || "Register | furEverHome"}</title>
            </Helmet>

            <div className="text-center my-4">
                <img className="w-16 mx-auto" src={logo} alt="furEverHome" />
                <Link to="/" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    furEverHome
                </Link>
            </div>

            <div className="my-4 md:w-1/3 mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Create Your Account
                </h2>
                <SocialLogin />
                <div className="my-6 border-t border-dashed border-gray-300 dark:border-gray-600"></div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" value="Your Name" className="dark:text-gray-300" />
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                            shadow
                            className="mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" value="Your Email" className="dark:text-gray-300" />
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            shadow
                            className="mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" value="Your Password" className="dark:text-gray-300" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
                                    message: "Password must be 6-15 characters, include at least one uppercase, one lowercase letter, and one number.",
                                },
                            })}
                            shadow
                            className="mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <Label htmlFor="fileUpload" value="Upload Profile Picture" className="dark:text-gray-300" />
                        <FileInput
                            id="fileUpload"
                            accept="image/*"
                            {...register("image", {
                                required: "Profile picture is required",
                                validate: {
                                    isImage: (fileList) => {
                                        const file = fileList?.[0];
                                        if (!file) return "Please upload a file.";
                                        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
                                        if (!validTypes.includes(file.type)) {
                                            return "Only JPEG, PNG, or JPG files are allowed.";
                                        }
                                        return true;
                                    },
                                },
                            })}
                            className="mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>

                    <Button type="submit" color="indigo" className="w-full">
                        Register
                    </Button>
                </form>

                <p className="font-medium text-center mt-6 text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
