import React from 'react';

const AllProductsCard = ({product}) => {
    
    const {_id, name, img, price, description, ratting, product_id} = product;
    
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-2xl mb-8 mx-auto">
                <figure><img src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className=''>
                        <h2 className="card-title text-blue-700">Product Name: {name}</h2>
                        <p className='text-xl text-semibold'>Price: {price}</p>
                    </div>
                    <p className='font-semibold'>Product ID: {product_id}</p>
                    <p>Ratting: {ratting}</p>
                </div>
            </div>
        </div>
    );
};

export default AllProductsCard;