import { useLocation } from "react-router-dom";

const useActiveLink = (path) => {
    const location = useLocation();
    return location.pathname === path ? "bg-green-500 text-white rounded px-3 py-2" : "px-3 py-2";
};

export default useActiveLink;