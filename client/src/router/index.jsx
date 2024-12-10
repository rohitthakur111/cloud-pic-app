import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/Home";
import Main from "../layout/Main";
import AddImage from "../pages/upload/AddImage";
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
        path: "/upload-image",
        element: <AddImage/>,
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
            element : <Images />
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