import { createBrowserRouter } from "react-router-dom";

import Shop from "../pages/images";
import Main from "../layout/Main";
import Image from '../pages/single/Image'
import Login from "../pages/login/Login";
import Register from "../pages/register/Register.jsx";
import Profile from "../pages/profile/Profile.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import Whish from "../pages/media/Whish.jsx";
import Premium from "../pages/premium/Premium.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import NotFound from "../pages/NotFound.jsx";
import  Dashboard  from "../admin/pages/dashboard";
import  Images  from "../admin/pages/images";
import  UserList  from "../admin/pages/users";
import AddImage from "../admin/pages/newimage";
import AdminImage from "../admin/pages/image";
import EditImage from "../admin/pages/editimage/index.jsx";
import Home from "../pages/home";
import Free from "../pages/free/index.jsx";
import Paid from "../pages/free/Paid.jsx";

const router = createBrowserRouter([
{
    path: "/",
    element: <Main />,
    children : [
    {
        path: "/",
        element: <Home/>,
    },   
    {
        path: "/images",
        element: <Shop/>,
    },
    {
        path : '/free',
        element : <Free />
    },
    {
        path : '/paid',
        element : <Paid />
    },
    {
        path : "/login",
        element : <PrivateRoute element={<Login /> }> </PrivateRoute>
    },
    {
        path : "/register",
        element : <PrivateRoute element={<Register /> }> </PrivateRoute>
    },
    {
        path: "/image/:id",
        element: <Image/>,
    },
    {
        path : "/profile",
        element : <Profile />
    },
    {
        path : '/whish',
        element : <Whish />
    },
    {
        path : '/premium',
        element : <Premium />
    },
    {
        path : '*',
        element : <NotFound />
    }
    ]
},
{
    path : 'Admin',
    element: <AdminLayout />,
    children : [
        {
            index : true,
            element : <Dashboard />
        },
        {
            path : 'images',
            element : <Images />,
        },
        {
            path : 'images/:id',
            element : <AdminImage />
        },
        {
            path : 'images/:id/edit',
            element : <EditImage />
        },
        {
            path : 'users',
            element : <UserList />
        },
        {
            path: "add-new",
            element: <AddImage/>,
        },
        
    ]

    
},

]);

export default router