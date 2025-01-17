import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/loginAndRegistration/Register";
import Login from "../pages/loginAndRegistration/Login";
import Dashboard from "../layouts/Dashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
            }
        ]
    }
])


export default Routes;