import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../images/login.svg';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import SocialMediaLogin from '../SocialMediaLogin/SocialMediaLogin';

const Login = () => {

    const {loginUser} = useContext(AuthContext);
    const [error, setError] = useState('');

    //login korar por jei page e redirect korbo tar code 
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    //console.log(from)


    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log("User from Login page", user);


                const currentUser = {
                    email: user?.email
                }

                

                //code for requesting and getting the jwt token on the server side from client side 
                fetch('https://product-crud-pagination-jwt-server.vercel.app/jwt', {
                    method: 'POST',
                    headers:{
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(currentUser)
                })

                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log("Token ", data.token)

                    //set the jwt token in the local storage
                    localStorage.setItem('product-token', data.token)

                    Swal.fire(
                        'Good job!',
                        'Login Successful After getting the JWT Token',
                        'success'
                    )
                    setError('');
                    event.target.reset();
                    navigate(from, {replace: true});
                })

                
            })

            .catch(error => {
                setError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Login Failed',
                    text: 'Something went wrong!',
                })
            })
    }




    return (
        <div className="hero my-24">
            <div className="hero-content flex-col lg:flex-row-reverse grid md:grid-cols-2 gap-24">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-4xl font-bold text-center">Login</h1>

                    <form
                        onSubmit={handleLogin}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input name="email" type="text" placeholder="Enter Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="Enter Password" className="input input-bordered" required />
                            <label className="label">
                                <Link className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>

                        <div>
                            {error && <p className='text-red-600'>{error}</p>}
                        </div>

                        <div className="form-control mt-2">
                            <input type="submit" value="Login" className="btn btn-primary bg-orange-600 border-0" />
                        </div>

                    </form>
                    <div className='text-center mb-2'>
                        <p>New to Genius Car?  <Link to='/signup' className='text-orange-400 font-semibold'>Sign Up</Link></p>
                    </div>

                    <div className='mb-4'>
                        <SocialMediaLogin></SocialMediaLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;