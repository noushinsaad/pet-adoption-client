import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                        <Label htmlFor="repeatPassword" value="Repeat Password" />
                    </div>
                    <TextInput
                        id="repeatPassword"
                        type="password"
                        {...register("repeatPassword", {
                            required: "Please confirm your password",
                            validate: (value) => value === watch("password") || "Passwords do not match",
                        })}
                        shadow
                    />
                    {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword.message}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fileUpload" value="Upload Image" />
                    </div>
                    <FileInput
                        id="fileUpload"
                        {...register("fileUpload")}
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
