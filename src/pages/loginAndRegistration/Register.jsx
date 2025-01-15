import { Button, Checkbox,  Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="md:w-1/3 mx-auto">
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your Name" />
                    </div>
                    <TextInput id="email2" type="text" placeholder="your name" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" type="password" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput id="repeat-password" type="password" required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </Link>
                    </Label>
                </div>
                <Button type="submit">Register new account</Button>
            </form>
            <p className="font-semibold my-4 text-gray-700">
                Already Have An Account?
                <Link to="/login">
                    <span className="text-[#D14334]"> Login</span>
                </Link>
            </p>
            <div className="my-8 border-t border-gray-300"></div>
        </div>
    );
};

export default Register;