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
                element: <Services></Services>
            },
            {
                path: 'addServices',
                element: <AddService></AddService>
            },
            {
                path: '/serviceDetails/:id',
                element: <ServiceDetails></ServiceDetails>
            },
            {
                path: '/bookDetails/:id',
                element: <BookDetails></BookDetails>
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