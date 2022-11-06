import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AllProductsCard from './AllProductsCard';
import './AllProducts.css';
import AddProducts from '../AddProducts/AddProducts';
import AddedProductByUser from './AddedProductByUser';


/** Pagination korte hole ja ja lagbe
    1. product count ==> Done
    2. per page e koyta data thakbe (for example: per page data 10)
    3. Koyta page lagbe ==> count / per page data
    4. kon page e achi sheieta lagbe (currentPage)
 * 
*/




const AllProducts = () => {

    // const allProducts = useLoaderData();
    // //console.log(allProducts);

    // const [displayAllProducts, setDisplayAllProducts] = useState(allProducts);
    // console.log("display All Products State data from AllProducts.js File", displayAllProducts);




    const [allProducts, setAllProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const totalPages = Math.ceil(count / size);


    console.log("Total Products", allProducts);



    useEffect(() => {
        const url = `https://product-crud-pagination-jwt-server.vercel.app/allProducts?page=${page}&size=${size}`
        console.log(page, size);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCount(data.count);
                setAllProducts(data.allProducts);
            });
    }, [page, size])


    // const [addedProducts, setAddedProducts] = useState([]);
    // useEffect(() => {
    //     fetch('https://product-crud-pagination-jwt-server.vercel.app/products')
    //         .then(res => res.json())
    //         .then(data => setAddedProducts(data))
    // }, [])










    //search kore product show korar code
    const [productSearch, setProductSearch] = useState('')
    const handleSearchProduct = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        setProductSearch({search})
        console.log("Search Value",search);
        //function er moddhe productSearch console log korle er value ta ageyr value ashce
        //console.log("Product Search State Value Inside Function: ", productSearch);
        
    }
    console.log("Product Search State Value Outside Function: ", productSearch);



    useEffect(() => {
        fetch(`https://product-crud-pagination-jwt-server.vercel.app/allProducts?name=${productSearch}`, {
            // method: 'POST',
            // headers: {
            //     'content-type': 'application/json'
            // },
            // body: JSON.stringify({productSearch})
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data inside Header Page in client side", data)
            })

    }, [productSearch])



    return (
        <div>


            <div>
                <form onSubmit={handleSearchProduct}>
                    <div className='text-center'>
                        <input type="text" placeholder="Type Product Name" className="input input-bordered input-secondary w-full max-w-lg" name="search" />
                        <button type='submit' className="btn btn-outline btn-secondary ml-2 px-8">Search</button>
                    </div>
                </form>
            </div>

            <h1 className="text-2xl font-bold text-center my-8 text-blue-800">Total Products In This Page: {allProducts.length}</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {
                    allProducts.map(product => <AllProductsCard key={product._id} product={product}></AllProductsCard>)
                }

            </div>

            <div className='pagination text-center'>
                <p className='text-xl mb-4 font-semibold bg-blue-200 w-3/4 mx-auto rounded-md py-2'>Currently Selected Page <span className='text-red-600 font-bold text-2xl'>{page}</span> Products Per Page <span className='text-2xl text-red-600'>{size}</span></p>

                {
                    [...Array(totalPages).keys()].map(number => <button className={page === number ? 'btn btn-ghost selected mr-2 text-xl' : 'btn btn-ghost mr-2 text-xl'} key={number} onClick={() => setPage(number)}>{number}</button>)
                }

                <select
                    onChange={event => setSize(event.target.value)}
                    className='option-select w-16 bg-slate-300 py-1 px-2 rounded-md ml-6 mt-1 sm:mt-4'>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>

            </div>
        </div>
    );
};

export default AllProducts;