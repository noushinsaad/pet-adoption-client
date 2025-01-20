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
import AllDonationCampaign from "../pages/Dashboard/Admin/AllDonationCampaign";
import MyDonationCampaign from "../pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import MyAddedPets from "../pages/Dashboard/MyAddedPets/MyAddedPets";
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaign from "../pages/DonationCampaign/DonationCampaign";
import DonationCampaignDetails from "../pages/DetailsInfo/DonationCampaignDetails";
import PetDetails from "../pages/DetailsInfo/PetDetails";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";

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
            },
            {
                path: 'petListing',
                element: <PetListing></PetListing>
            },
            {
                path: 'donationCampaigns',
                element: <DonationCampaign></DonationCampaign>
            },
            {
                path: 'petDetails/:id',
                element: <PetDetails></PetDetails>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-side-zeta.vercel.app/pets/${params.id}`)
            },
            {
                path: 'donationCampaignDetails/:id',
                element: <DonationCampaignDetails></DonationCampaignDetails>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-side-zeta.vercel.app/donationsCampaign/${params.id}`)
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
            {
                path: 'allDonations',
                element: <AdminRoutes><AllDonationCampaign></AllDonationCampaign></AdminRoutes>
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
            },
            {
                path: 'myDonationCampaign',
                element: <MyDonationCampaign></MyDonationCampaign>
            },
            {
                path: 'myAddedPets',
                element: <MyAddedPets></MyAddedPets>
            },
            {
                path: 'adoptionRequest',
                element: <AdoptionRequest></AdoptionRequest>
            }
        ]
    }
])


export default Routes;