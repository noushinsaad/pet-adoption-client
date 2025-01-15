import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import FooterComp from "../pages/Shared/FooterComp";


const Main = () => {
    return (
        <div>
            <nav className="sticky top-0 z-50 shadow-md">
                <NavBar></NavBar>
            </nav>
            <main className="my-6 min-h-screen">
                <Outlet></Outlet>
            </main>
            <footer>
                <FooterComp></FooterComp>
            </footer>
        </div>
    );
};

export default Main;