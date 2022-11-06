import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import CartProductsCard from './CartProductsCard';

const CartProducts = () => {

    //const products = useLoaderData();
    //console.log("Added Products in Cart from CartProducts File", products);

    const {logoutUser} = useContext(AuthContext);


    const [products, setProducts] = useState([]);
    useEffect( () => {
    fetch('https://product-crud-pagination-jwt-server.vercel.app/products', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('product-token')}`
        }
    })
        .then(res =>{
            if(res.status === 401 || res.status === 403){
                logoutUser();
            }
            return res.json();
        })
        .then(data => {
            console.log(data)
            setProducts(data)
        })
    }, [logoutUser])





    const handleDeleteProduct = (id) => {
        console.log("Clicked Product ID ", id);

        //confirm box er moddhe ok korle console er moddhe agree er value hobe true and cacel kore dile agree er value hobe false.
        const agree = window.confirm(`Are you sure you want to delete the product of ${id}`);

        if (agree) {
            fetch(`https://product-crud-pagination-jwt-server.vercel.app/products/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('product-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Clicked data", data)

                    if (data.deletedCount > 0) {
                        const remainingProducts = products.filter(singleProduct => singleProduct._id !== id);
                        console.log("Remaining Products: ", remainingProducts);
                        setProducts(remainingProducts);
                    }
                })
        }
    }







    return (
        <div>

            <div className="overflow-x-auto w-full mb-24">
                <table className="table w-full">

                    <thead>
                        <tr className=''>
                            <th className='text-red-600'>Action</th>
                            <th>Photo</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Quantity</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>
                        {
                            products.map(product => <CartProductsCard handleDeleteProduct = {handleDeleteProduct} key={product._id} product={product}></CartProductsCard>)
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default CartProducts;