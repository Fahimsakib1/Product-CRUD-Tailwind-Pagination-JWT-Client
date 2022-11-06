import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';



const ProductsAddByEmail = () => {

    const { user } = useContext(AuthContext);

    const handleAddProductsByEmail = (event) => {
        event.preventDefault();

        const userName = event.target.userName.value;
        const productName = event.target.productName.value;
        const productPhoto = event.target.photoURL.value;
        const email = user?.email || 'Unregistered User';
        const description = event.target.productDescription.value;
        const quantity = event.target.productQuantity.value;
        const price = event.target.productPrice.value;
        console.log(userName, productName, productPhoto, email, description, quantity, price)

        const productInfo = {
            userName: userName,
            productName: productName,
            productPhoto: productPhoto,
            description: description,
            quantity: quantity,
            price:price,
            email: email
        }

        fetch('https://product-crud-pagination-jwt-server.vercel.app/productsByEmail', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        })

            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    console.log(data)
                    Swal.fire(
                        'Good job!',
                        'Order Placed Successfully',
                        'success'
                    )
                    event.target.reset();
                }

                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... Order Not Placed',
                        text: 'Something went wrong!'
                    })
                }
            })
            .catch(error => console.error(error))


    }





    return (
        <div>
            <form onSubmit={handleAddProductsByEmail}>
                <div className='shadow-lg w-3/4 mx-auto'>
                    <h2 className='text-center font-bold text-blue-700 text-2xl mb-6'>Add Your Favorite Products</h2>

                    <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6 mb-8'>
                        <input name="userName" type="text" placeholder="User Name" className="input input-bordered w-full mx-auto" />

                        <input name="productName" type="text" placeholder="Product Name" className="input input-bordered w-full mx-auto" />

                        <input name="photoURL" type="text" placeholder="Product Photo URL" className="input input-bordered w-full mx-auto" required />

                        <input name="email" type="text"
                            defaultValue={user?.email
                            }
                            readOnly
                            placeholder="Your Email Address" className="input input-bordered w-full mx-auto text-gray-400 font-semibold" />

                        <input name="productQuantity" type="text" placeholder="Product Quantity" className="input input-bordered w-full mx-auto" />

                        <input name="productPrice" type="text" placeholder="Product Price" className="input input-bordered w-full mx-auto" required />

                    </div>

                    <div>
                        <textarea
                            name="productDescription"
                            className="textarea textarea-bordered w-full pb-12" placeholder="Product Description"></textarea>
                    </div>
                </div>

                <button type="submit" className="block p-3 text-center rounded-lg text-gray-100 bg-orange-600 mb-36 mt-10 w-1/2 mx-auto">Add Product</button>

            </form>

        </div>
    );
};

export default ProductsAddByEmail;