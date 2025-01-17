import { Button } from 'flowbite-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn, gitHubSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photoUrl: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Created your account Successfully, ${result.user.displayName}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                        else {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${result.user.displayName} logged in Successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
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
    }

    const handleGithubSignIn = () => {
        gitHubSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photoUrl: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Created your account Successfully, ${result.user.displayName}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                        else {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${result.user.displayName} logged in Successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
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
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <Button
                onClick={handleGoogleSignIn}
                color="gray" className='w-full'>
                <FcGoogle className="h-5 w-5" />Sign in with Google
            </Button>
            <Button
                onClick={handleGithubSignIn}
                color="gray" className='w-full'>
                <FaGithub className="h-5 w-5" />Sign in with Github
            </Button>
        </div>
    );
};

export default SocialLogin;