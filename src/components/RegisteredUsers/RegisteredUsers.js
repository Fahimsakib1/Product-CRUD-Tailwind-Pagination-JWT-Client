import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import UsersTableRow from './UsersTableRow';

const RegisteredUsers = () => {
    
    const {logoutUser} = useContext(AuthContext)
    
    const [users, setUsers] = useState([])
    
    useEffect( () => {
        fetch('https://product-crud-pagination-jwt-server.vercel.app/users', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('product-token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                return logoutUser();
            }
            return res.json();
        })
        .then(data => setUsers(data))
    }, [logoutUser])



    const handleDeleteUser = (id, name) => {
        //console.log("Clicked Product ID ", id, name);

        const agree = window.confirm(`Are you Sure You Want To Remove ${name}`)

        if(agree){
            fetch(`https://product-crud-pagination-jwt-server.vercel.app/users/${id}`, {
                method: 'DELETE',
                headers:{
                    authorization: `Bearer ${localStorage.getItem('product-token')}`
                }
            })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    const remainingUsers = users.filter(user => user._id !== id);
                    console.log("Remaining  Users: ", remainingUsers);
                    setUsers(remainingUsers);
                }
            })
        }
    }
    
    return (
        <div>
            <div>
                <h2 className='text-center text-3xl text-blue-700 font-semibold my-8'>All Registered Users</h2>
            </div>

            <div>
                <div className="overflow-x-auto w-full mb-24">
                    <table className="table w-full">
                        
                        <thead>
                            <tr className=''>
                                <th className='text-red-600'>Action</th>
                                <th>User Name</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Registration Date</th>
                            </tr>
                        </thead>
                        
                        <tbody className='text-center'>
                            {
                                users.map(user => <UsersTableRow key={user._id} user = {user} handleDeleteUser={handleDeleteUser}></UsersTableRow>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default RegisteredUsers;