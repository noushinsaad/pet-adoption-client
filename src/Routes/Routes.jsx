import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/loginAndRegistration/Register";
import Login from "../pages/loginAndRegistration/Login";
import Dashboard from "../layouts/Dashboard";
import PrivateRoutes from "../Routes/PrivateRoutes"
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import UserHome from "../pages/Dashboard/User/UserHome";
import AddPetForm from "../pages/Dashboard/AddAPet/AddPetForm";
import CreateDonationCampaign from "../pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import AllPets from "../pages/Dashboard/Admin/AllPets";

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
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [

            {
                path: 'allUsers',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'adminHome',
                element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
            },
            {
                path: 'allPets',
                element: <AdminRoutes><AllPets></AllPets></AdminRoutes>
            },

            // routes for user
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'addPet',
                element: <AddPetForm></AddPetForm>
            },
            {
                path: 'createDonationCampaign',
                element: <CreateDonationCampaign></CreateDonationCampaign>
            }
        ]
    }
])


export default Routes;