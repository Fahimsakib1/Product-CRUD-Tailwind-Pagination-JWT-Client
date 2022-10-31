import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import Swal from 'sweetalert2';



const UpdateProducts = () => {

    const storedProduct = useLoaderData();
    const { name, _id, photoURL, quantity } = storedProduct
    console.log("Product From Update Route", storedProduct)


    const [selectedProduct, setSelectedProduct] = useState(storedProduct);



    const handleInputChange = (event) => {
        const inputFieldName = event.target.name;
        const value = event.target.value;

        const newProduct = { ...selectedProduct };
        newProduct[inputFieldName] = value;
        setSelectedProduct(newProduct);
    }


    const handleUpdateProduct = (event) => {
        event.preventDefault();

        fetch (`http://localhost:5000/products/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(selectedProduct)
        })

        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire(
                    'Good job!',
                    'Product Updated Successfully to both Server and Database!',
                    'success'
                )

                event.target.reset();
            }
        })
        
    }



    return (
        <div>


            <h1 className='text-center text-2xl font-bold mb-3 text-blue-800 '> Your Chosen Product</h1>
            <div className="card card-compact w-96 bg-base-100 shadow-xl mb-8 mx-auto">
                <figure><img src={photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className='flex justify-between'>
                        <h2 className="card-title">{name}</h2>
                        <div className='flex align-center justify-center'>
                            <FaShoppingCart className='my-auto text-3xl pr-2'></FaShoppingCart>
                            <h2 className="text-xl font-bold">{quantity}</h2>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100 mx-auto mb-24">
                <h1 className="text-2xl font-bold text-center">Update Product</h1>
                <form onSubmit={handleUpdateProduct} className="space-y-6 ng-untouched ng-pristine ng-valid">

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-400">Product Name</label>
                        <input onChange={handleInputChange} defaultValue={name} type="text" name="name" id="name" placeholder="Product Name" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400 text-lg" />
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-400">Photo URL</label>
                        <input onChange={handleInputChange} defaultValue={photoURL} type="text" name="photoURL" id="photoURL" placeholder="Add Photo URL" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400 text-lg" />
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-400">Quantity</label>
                        <input onChange={handleInputChange} defaultValue={quantity} type="text" name="quantity" id="password" placeholder="Add Quantity" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400 text-lg" />
                    </div>

                    <button className="block w-full p-3 text-center rounded-lg text-gray-100 bg-orange-600">Update Product</button>
                </form>

            </div>
        </div>
    );
};

export default UpdateProducts;
