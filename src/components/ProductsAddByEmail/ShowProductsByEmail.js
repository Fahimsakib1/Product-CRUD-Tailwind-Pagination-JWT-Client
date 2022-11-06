import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import ShowProductsByEmailTable from './ShowProductsByEmailTable';
import Swal from 'sweetalert2';


const ShowProductsByEmail = () => {

    const { user, logoutUser } = useContext(AuthContext);
    const [productsByEmail, setProductsByEmail] = useState([]);

    useEffect(() => {

        fetch(`https://product-crud-pagination-jwt-server.vercel.app/productsByEmail?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setProductsByEmail(data))

    }, [user?.email])

    
    // product er total price add kora holo reduce method diye
    const totalPrice = productsByEmail.reduce( (acc, product) => (parseInt(acc) + parseInt(product.price * product.quantity)), 0 )
    console.log("Total Price: ", totalPrice);



    const handleRemoveProduct = (id, name, productName) => {
        console.log("User Name", name, "Product Name: ", productName,"and ID: ", id);

        const agree = window.confirm (`Are you sure you want to remove ${productName} from your cart?`);
        if(agree){
            fetch(`https://product-crud-pagination-jwt-server.vercel.app/productsByEmail/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('product-token')}`
                }
            })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    logoutUser();
                }

                return res.json()
            
            })

            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    Swal.fire(
                        'Great!',
                        'Item Deleted',
                        'success'
                    )

                    const remaining = productsByEmail.filter(product => product._id !== id);
                    setProductsByEmail(remaining);
                }

                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Order Deleting failed',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    }






    return (
        <div>

            <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-gray-700 text-gray-100 mx-auto rounded-lg">
                <h2 className="text-xl font-semibold text-center"><span className=''>{productsByEmail.length}</span> Added Products of <span className=''>{user?.email}</span></h2>
                <ul className="flex flex-col divide-y divide-gray-700">

                    {
                        productsByEmail.map(product => <ShowProductsByEmailTable key={product._id} product={product}handleRemoveProduct ={handleRemoveProduct}></ShowProductsByEmailTable>)
                    }

                </ul>


                <div className="space-y-1 text-right">
                    <p className='text-green-600 font-bold text-md'>Total Amount: {totalPrice} Taka
                    </p>
                    <p className="text-sm dark:text-gray-400">Not including taxes and shipping costs</p>
                </div>


                <div className="flex justify-end space-x-4">
                    <Link to='/addProductsWithEmail'>
                        <button type="button" className="px-6 py-2 border rounded-md border-violet-400">Add More Products
                        </button>
                    </Link>

                    <Link to='/'>
                        <button type="button" className="px-6 py-2 border rounded-md bg-violet-400 text-gray-900 border-violet-400"> Back To Home
                        </button>
                    </Link>
                </div>

            </div>


        </div>
    );
};

export default ShowProductsByEmail;