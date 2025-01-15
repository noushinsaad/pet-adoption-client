import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

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
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="name@flowbite.com"
                        {...register("email", {
                            required: "Email is required",

                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>
                {/* <div className="flex items-center gap-2">
                    <Checkbox id="remember" {...register("remember")} />
                    <Label htmlFor="remember">Remember me</Label>
                </div> */}
                <Button type="submit">Submit</Button>
            </form>
            <p className="font-semibold my-4">
                Don’t Have An Account?{" "}
                <Link to="/register">
                    <span className="text-red-500">Register</span>
                </Link>
            </p>
        </div>
    );
};

export default Login;
