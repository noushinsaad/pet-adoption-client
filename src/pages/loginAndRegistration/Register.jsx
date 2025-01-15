import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


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
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
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
                            })
                    })
            })

    };

    return (
        <div className="md:w-1/3 mx-auto">
            <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="Your name"
                        {...register("name", { required: "Name is required" })}
                        shadow
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your Email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="name@flowbite.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@]+@[^@]+\.[^@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        shadow
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your Password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        shadow
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fileUpload" value="Upload Image" />
                    </div>
                    <FileInput
                        id="fileUpload"
                        {...register("image", { required: "File upload is required" })}
                    />
                    {errors.fileUpload && <p className="text-red-500 text-sm">{errors.fileUpload.message}</p>}
                </div>
                <Button type="submit">Register New Account</Button>
            </form>
            <p className="font-semibold my-4 text-gray-700">
                Already Have An Account?{" "}
                <Link to="/login">
                    <span className="text-[#D14334]">Login</span>
                </Link>
            </p>
            <div className="mb-8 border-t border-gray-300"></div>
        </div>
    );
};

export default Register;
