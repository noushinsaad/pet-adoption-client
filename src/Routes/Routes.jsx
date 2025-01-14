import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
])


export default Routes;