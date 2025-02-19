import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import FooterComp from "../pages/Shared/FooterComp";

const Main = () => {
    const location = useLocation();
    const hideNavFooter = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            {!hideNavFooter && (
                <nav className="sticky top-0 z-50 shadow-md">
                    <NavBar />
                </nav>
            )}

            <main className="min-h-screen">
                <Outlet />
            </main>

            {!hideNavFooter && (
                <footer>
                    <FooterComp />
                </footer>
            )}
        </div>
    );
};

export default Main;
