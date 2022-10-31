import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../AddProducts/AddProducts";
import Home from "../Home/Home";
import Layout from "../Layout/Layout";
import ReadProducts from "../ReadProducts/ReadProducts";
import UpdateProducts from "../UpdateProducts/UpdateProducts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/addProducts',
                element: <AddProducts></AddProducts>
            },

            {
                path: '/manageProducts',
                loader: () => fetch('http://localhost:5000/products'),
                element: <ReadProducts></ReadProducts>
            },

            {
                path: '/updateProduct/:id',
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <UpdateProducts></UpdateProducts>
            }
        ]
    }
])

export default router;