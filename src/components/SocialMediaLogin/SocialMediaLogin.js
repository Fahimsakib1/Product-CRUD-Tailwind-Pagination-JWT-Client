import React from 'react';
import { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { tokenFunction } from '../../JWTTokenFunction/JWTTokenFunction';




const SocialMediaLogin = () => {
    
    const {googleLogin} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const user = result.user;
            console.log(user);

            // const currentUser = {
            //     email: user?.email
            // }

            // fetch('https://product-crud-pagination-jwt-server.vercel.app/jwt', {
            //         method: 'POST',
            //         headers:{
            //             'content-type': 'application/json',
            //         },
            //         body: JSON.stringify(currentUser)
            //     })

            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data)
            //         console.log("Token ", data.token)

            //         //set the jwt token in the local storage
            //         localStorage.setItem('product-token', data.token)

            //         Swal.fire(
            //             'Good job!',
            //             'Login Successful After getting the JWT Token',
            //             'success'
            //         )
            //         navigate(from, {replace: true});
            //     })

            // if(tokenFunction(user)){
            //     navigate(from, {replace: true});
            //     Swal.fire(
            //         'Good job!',
            //         'Successful Login After getting the JWT Token From JWT Token Function',
            //         'success'
            //     )
            // }
            // else{
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops... Login Failed',
            //         text: 'Something went wrong!',
            //     })
            // }

            tokenFunction(user);
            navigate(from, {replace: true});

        })

        .catch(error => console.error(error))
    }
    
    return (
        <div>
            <h1 className='text-center text-lg text-blue-800'>Social Login</h1>

            <p className='text-center'>
                <button onClick={handleGoogleLogin} className='btn btn-ghost text-3xl'><FcGoogle></FcGoogle></button>
            </p>
        </div>
    );
};

export default SocialMediaLogin;