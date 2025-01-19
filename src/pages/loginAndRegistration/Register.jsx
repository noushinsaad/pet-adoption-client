import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })
        const photoUrl = res.data.data.display_url;
        createUser(data.email, data.password)
            .then(result => {
                // eslint-disable-next-line no-unused-vars
                const loggedUser = result.user;
                // console.log(loggedUser)
                updateUserProfile(data.name, photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoUrl: photoUrl
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                                else {
                                    Swal.fire({
                                        title: "Error",
                                        text: "already exist",
                                        icon: "error",
                                        timer: 3000,
                                    });
                                }
                            })
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error",
                            timer: 3000,
                        });
                    });
            })

    };

    return (
        <div className="my-8 md:w-1/3 mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create Your Account
            </h2>
            {/* social media login */}
            <SocialLogin />
            <div className="my-6 border-t border-dashed border-gray-300"></div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

                {/* name */}
                <div>
                    <Label htmlFor="name" value="Your Name" />
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", { required: "Name is required" })}
                        shadow
                        className="mt-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email" value="Your Email" />
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
                        className="mt-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* password */}
                <div>
                    <Label htmlFor="password" value="Your Password" />
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
                        className="mt-2"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Profile Pic */}
                <div>
                    <Label htmlFor="fileUpload" value="Upload Profile Picture" />
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
                        className="mt-2"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}
                </div>

                <Button type="submit" color="indigo" className="w-full">
                    Register
                </Button>
            </form>
            <p className="font-medium text-center mt-6 text-gray-700">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;
