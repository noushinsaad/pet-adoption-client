import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adoption-server-side-zeta.vercel.app'
    // 'https://pet-adoption-server-side-zeta.vercel.app','http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;