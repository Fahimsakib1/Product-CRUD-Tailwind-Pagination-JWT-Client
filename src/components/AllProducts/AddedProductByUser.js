import React from 'react';

const AddedProductByUser = ({product}) => {
    
    const {name, photoURL} = product;

    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-2xl mb-8 mx-auto">
                <figure><img src={photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className=''>
                        <h2 className="card-title text-blue-700">Product Name: {name}</h2>
                        <p className='text-xl text-semibold'>Price: {product?.price ? product.price : <span className='text-red-600 text-sm'>Price Not Defined</span>}</p>
                    </div>
                    <p className='font-semibold'>Product ID: <span className='text-red-600 text-md'>{`${product.product_id ? product.product_id : "ID Not Added"}`}</span></p>
                    <p>Ratting: <span className='text-red-600 text-md'>{product?.ratting ? product.ratting : "Rating Not Defined"}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AddedProductByUser;