import React from 'react';
import { ImCancelCircle, ImBin } from "react-icons/im";

const UsersTableRow = ({user, handleDeleteUser}) => {
    
    const {name, email, date, _id} = user;

    
    return (
        <tr>
            <th>
                <label>
                    {/* <ImCancelCircle 
                    onClick={() => handleDeleteUser(_id, name)}
                    className='text-2xl text-red-500 hover:text-red-800'></ImCancelCircle> */}

                    <ImBin onClick={() => handleDeleteUser(_id, name)}
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
                        <div className="font-semibold text-center">{name}</div>
                    </div>
                </div>
            </td>

            <td>
                <span className='font-semibold'>{email}</span>
                <p>{_id}</p>
            </td>
            
            <td>{date}</td>
        </tr>
    );
};

export default UsersTableRow;