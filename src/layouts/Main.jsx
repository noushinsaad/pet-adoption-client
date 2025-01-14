import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";


const Main = () => {
    return (
        <div>
            <nav className="sticky top-0 z-50 shadow-md">
                <NavBar></NavBar>
            </nav>
            <main className="my-6">
                <Outlet></Outlet>
            </main>
            <footer>

            </footer>
        </div>
    );
};

export default Main;