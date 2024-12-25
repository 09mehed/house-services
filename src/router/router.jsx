import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import AddService from "../Pages/AddService";
import ServiceDetails from "../Pages/ServiceDetails";
import BookDetails from "../Pages/BookDetails";
import ManageServices from "../Pages/ManageServices";
import UpdateService from "../Pages/UpdateService";
import { param } from "framer-motion/client";
import BookedService from "../Pages/BookedService";
import ServiceToDo from "../Pages/ServiceToDo";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <h2>Route not found</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/services',
                element: <PrivateRoute><Services></Services></PrivateRoute>
            },
            {
                path: 'addServices',
                element: <PrivateRoute><AddService></AddService></PrivateRoute>
            },
            {
                path: '/serviceDetails/:id',
                element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>
            },
            {
                path: '/bookDetails/:id',
                element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>
            },
            {
                path: '/manageServices',
                element: <PrivateRoute><ManageServices></ManageServices></PrivateRoute>
            },
            {
                path: '/booked-service',
                element: <PrivateRoute><BookedService></BookedService></PrivateRoute>
            },
            {
                path: '/service-to-do',
                element: <PrivateRoute><ServiceToDo></ServiceToDo></PrivateRoute>
            },
            {
                path: '/updateService/:id',
                element: <PrivateRoute><UpdateService></UpdateService></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/all-service/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
]);

export default router