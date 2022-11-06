import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import logo from '../../images/Logo.PNG';
import './Header.css'




const Header = () => {

    const { user, logoutUser } = useContext(AuthContext);
    //console.log("User From Header Page", user);
    //console.log("Products From Header Page by Context", ContextProducts);
    const navigate = useNavigate();


    const handleLogout = () => {
        logoutUser()
            .then(() => {
                Swal.fire(
                    'Good job!',
                    'Sign Out Done',
                    'success'
                )
                navigate('/')
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Log out Failed',
                    text: 'Something went wrong!',
                })
            })
    }



    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     fetch('https://product-crud-pagination-jwt-server.vercel.app/products', {
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('product-token')}`
    //         }
    //     })
    //         .then(res => {
    //             if(res.status === 401 || res.status === 403){
    //                 logoutUser();
    //             }
    //             return res.json();
    //         })
    //         .then(data => setProducts(data));
    // }, [logoutUser])

    // console.log(products)




















    const menuItems = <>
        {/* <div className='flex'>
            <img className='header-image' src={logo} alt="" />
            <li className='font-bold text-xl uppercase text-blue-700 -ml-2'> <Link to='/'>Product Planet</Link></li>
        </div> */}
        <li className='font-semibold'> <Link to='/'>Home</Link></li>
        <li className='font-semibold'> <Link to='/allProducts'>All Products</Link></li>
        <li className='font-semibold'> <Link to='/addProducts'>Add Products</Link></li>
        <li className='font-semibold'> <Link to='/addProductsWithEmail'>Add Products With Email</Link></li>


        {
            user?.email ?
                <>
                    {/* <li className='font-bold px-2 text-green-600'> <Link to='/manageProducts'>Cart<span className='-mt-4 -ml-2 text-lg font-bold text-blue-700'>{`${user?.email ? products.length : 0}`}</span></Link></li> */}

                    {/* <li className='font-bold px-2 text-green-600'> <Link to='/manageProducts'>Cart</Link></li> */}

                    <li className='font-semibold'> <Link to='/registeredUsers'>Registered Users</Link></li>

                    <li className='font-bold text-red-600'>
                        <button
                            onClick={handleLogout}
                            className='btn-ghost'>Logout</button>
                    </li>
                </>

                :
                <>
                    <li className='font-bold text-blue-800'> <Link to='/login'>Login</Link></li>

                    <li className='font-bold text-purple-800'> <Link to='/signup'>Sign Up</Link></li>
                </>
        }

        {
            user?.email && <p className='text-blue-800 font-semibold my-auto'>Welcome, {user.email}</p>
        }

    </>













    return (
        <div>
            <div className="navbar bg-gray-100 h-20 mb-12 shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

                <div className="navbar-end">
                    {/* <Link to='/manageProducts'>
                        <button className="btn btn-warning font-bold" title='view cart'>
                            <FaShoppingCart className='text-2xl'></FaShoppingCart>
                            <p className='-mt-6 text-lg'>{`${user?.email ? ContextProducts.length : 0}`}</p>
                        </button>
                    </Link> */}

                    {/* <Link to='/cartProducts'>
                        <button className="btn btn-warning font-bold ml-3" title='view cart'>
                            <FaShoppingCart className='text-2xl'></FaShoppingCart>
                            <p className='-mt-6 text-lg'>{``}</p>
                        </button>
                    </Link> */}

                    <Link to='/productsByEmail'>
                        <button className="btn btn-primary font-bold ml-3 mr-10" title='Products Filtered With Email'>
                            <FaShoppingCart className='text-2xl'></FaShoppingCart>
                        </button>
                    </Link>


                </div>

            </div>

        </div>
    );
};

export default Header;