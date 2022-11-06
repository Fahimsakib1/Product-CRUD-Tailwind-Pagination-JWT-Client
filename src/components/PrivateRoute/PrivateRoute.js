import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    
    const {user, loading} = useContext(AuthContext);
    console.log(loading)
    const location = useLocation();
    
    if(loading){
        return <h2 className='text-4xl text-center text-blue-800 font-bold'>Loading....</h2>
    }
    
    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
    
};

export default PrivateRoute;