import React, { useContext, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';

const ProductCard = ({ product, handleDeleteProduct }) => {

    const {user}  = useContext(AuthContext)
    const { name, photoURL, quantity, _id } = product;

    
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-2xl mb-8 mx-auto">
                <figure><img src={photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className='flex justify-between'>
                        <h2 className="card-title text-blue-700">{name}</h2>
                        <div className='flex align-center justify-center'>
                            <FaShoppingCart className='my-auto text-3xl pr-2 text-orange-400'></FaShoppingCart>
                            <h2 className="text-xl font-bold text-blue-700">{quantity}</h2>
                        </div>
                    </div>
                    <p className='font-semibold'>Product ID: {_id}</p>
                    <p className='font-semibold'>{user?.email && user.email}</p>
                    <div className="card-actions flex justify-between mt-4 mb-2">
                        <Link to={`/updateProduct/${_id}`}><button className="btn btn-primary">Update</button></Link>
                        <button className="btn btn-error" onClick={() => handleDeleteProduct(_id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;