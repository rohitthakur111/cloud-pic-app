import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/Home";
import Main from "../layout/Main";
import AddImage from "../pages/upload/AddImage";
import Image from '../pages/single/Image'
import Login from "../pages/login/Login";
import Register from "../pages/register/Register.jsx";

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
        element : <Login />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path: "/image/:id",
        element: <Image/>,
    },
    {
        path: "/upload-image",
        element: <AddImage/>,
    }
    ]
},
]);

export default router