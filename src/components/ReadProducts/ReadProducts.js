import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import Swal from 'sweetalert2';

const ReadProducts = () => {

    const products = useLoaderData();
    console.log("Products data by fetching", products)

    const [displayProducts, setDisplayProducts] = useState(products); 
    console.log("display products State data", displayProducts);



    const handleDeleteProduct = (id) => {
        console.log("Clicked Product ID ", id);

        //confirm box er moddhe ok korle console er moddhe agree er value hobe true and cacel kore dile agree er value hobe false.
        const agree = window.confirm(`Are you sure you want to delete the product of ${id}`);

        if (agree) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Clicked data", data)

                    if (data.deletedCount > 0) {
                        const remainingProducts = displayProducts.filter(singleProduct => singleProduct._id !== id);
                        console.log("Remaining Products: ", remainingProducts);
                        setDisplayProducts(remainingProducts);
                        Swal.fire(
                            'Good job!',
                            'Product Deleted Successfully',
                            'success'
                        )
                    }
                })
        }
    }


    return (
        <div className=''>
            <h1 className="text-2xl font-bold text-center my-8 text-blue-800">Total Products: {displayProducts.length}</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {
                    displayProducts.map(product => <ProductCard key={product._id} product={product} handleDeleteProduct ={handleDeleteProduct}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default ReadProducts;