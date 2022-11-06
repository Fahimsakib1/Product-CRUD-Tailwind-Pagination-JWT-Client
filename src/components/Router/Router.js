import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../AddProducts/AddProducts";
import AddedProductByUser from "../AllProducts/AddedProductByUser";
import AllProducts from "../AllProducts/AllProducts";
import CartProducts from "../CartProducts/CartProducts";
import Home from "../Home/Home";
import Layout from "../Layout/Layout";
import Login from "../Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ProductsAddByEmail from "../ProductsAddByEmail/ProductsAddByEmail";
import ShowProductsByEmail from "../ProductsAddByEmail/ShowProductsByEmail";
import ReadProducts from "../ReadProducts/ReadProducts";
import RegisteredUsers from "../RegisteredUsers/RegisteredUsers";
import Signup from "../SignUp/SignUp";
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
                // loader: () => fetch('https://product-crud-pagination-jwt-server.vercel.app/products'),
                element: <PrivateRoute><ReadProducts></ReadProducts></PrivateRoute>
            },

            {
                path: '/updateProduct/:id',
                loader: ({params}) => fetch(`https://product-crud-pagination-jwt-server.vercel.app/products/${params.id}`),
                element: <UpdateProducts></UpdateProducts>
            },

            {
                path: '/allProducts',
                // loader: () => fetch('https://product-crud-pagination-jwt-server.vercel.app/allProducts'),
                element: <AllProducts></AllProducts>
            },

            {
                path: '/login',
                element: <Login></Login>
            },

            
            {
                path: '/signup',
                element: <Signup></Signup>
            },

            {
                path:'/registeredUsers',
                element: <PrivateRoute><RegisteredUsers></RegisteredUsers></PrivateRoute>
            },

            {
                path: '/cartProducts',
                // loader: () => fetch('https://product-crud-pagination-jwt-server.vercel.app/products'),
                element: <PrivateRoute><CartProducts></CartProducts></PrivateRoute>
            },

            {
                path: '/addProductsWithEmail',
                element: <ProductsAddByEmail></ProductsAddByEmail>
            },

            {
                path: '/productsByEmail',
                element: <PrivateRoute><ShowProductsByEmail></ShowProductsByEmail></PrivateRoute>
            }
        ]
    }
])

export default router;