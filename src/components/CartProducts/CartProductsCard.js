import React from 'react';
import { ImCancelCircle, ImBin } from "react-icons/im";

const CartProductsCard = ({ product, handleDeleteProduct }) => {

    const { _id, name, photoURL, quantity } = product;
    return (
        <tr>
            <th>
                <label>
                    <ImBin
                        onClick={() => handleDeleteProduct(_id)}
                        className='text-2xl text-red-500 hover:text-red-800'></ImBin>
                </label>
            </th>

            <td>
                <div className="flex items-center space-x-3">
                    {/* <div className="avatar">
                    <div className="rounded w-24 h-24">
                        {
                            orderService?.img &&
                            <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                        }
                    </div>
                </div> */}
                    <div>

                        <div className="avatar">
                            <div className="w-24 rounded-xl">
                                <img src={photoURL} alt='' />
                            </div>
                        </div>
                        <p>Id: {_id}</p>
                    </div>
                </div>
            </td>

            <td>
                <div className="font-semibold text-center">{name}
                </div>

            </td>

            <td>{quantity}</td>
        </tr>
    );
};

export default CartProductsCard;