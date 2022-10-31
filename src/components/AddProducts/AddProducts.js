import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddProducts = () => {

    const [product, setProduct] = useState({})

    const handleInputBlur = (event) => {
        const inputFieldName = event.target.name;
        const value = event.target.value;
        console.log(inputFieldName, value);

        const newProduct = { ...product };
        newProduct[inputFieldName] = value;
        setProduct(newProduct);
    }


    const handleAddProducts = (event) => {
        event.preventDefault();
        console.log(product);

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        })

            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    Swal.fire(
                        'Good job!',
                        'Product Added Successfully to both Server and Database!',
                        'success'
                    )
                    event.target.reset();
                }

                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... User not added',
                        text: 'Something went wrong!'
                    })
                }
            })
    }


    return (
        <div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100 mx-auto mb-24">
                <h1 className="text-2xl font-bold text-center">Add Products</h1>
                <form onSubmit={handleAddProducts} className="space-y-6 ng-untouched ng-pristine ng-valid">

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-400">Product Name</label>
                        <input onBlur={handleInputBlur} type="text" name="name" id="name" placeholder="Product Name" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400" />
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-400">Photo URL</label>
                        <input onBlur={handleInputBlur} type="text" name="photoURL" id="photoURL" placeholder="Add photoURL" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400" />
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-400">Quantity</label>
                        <input onBlur={handleInputBlur} type="text" name="quantity" id="quantity" placeholder="Add Quantity" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400" />
                    </div>

                    <button className="block w-full p-3 text-center rounded-lg text-gray-100 bg-orange-600">Add Products</button>
                </form>

            </div>
        </div>
    );
};

export default AddProducts;