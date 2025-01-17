// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from './useAuth';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://pet-adoption-server-side-zeta.vercel.app'
})

const useAxiosSecure = () => {
    // const navigate = useNavigate();
    // const { logOut } = useAuth()

    return axiosSecure;
};

export default useAxiosSecure;