"use client"
import React, { useState, useEffect } from 'react';
import Footer from '../../pages/components/footer';
import Navbar from '../../pages/components/navbar';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const ProductView = () => {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        fetch(`${BACKEND}/admin/product/`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                console.log('Data', data.products);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getProducts();
    }
        , []);

    const updateProduct = (Name) => {

    }

    const updateProductStatus = (productId) => {
        fetch(`${BACKEND}/admin/product/status/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Data', data);
                getProducts();
            })
            .catch(err => {
                console.log(err);
            });
    }



    return (
        <div className="flex min-h-screen flex-col justify-between bg-black">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="w-full md:w-1/2 flex justify-center items-center">

                    <img src="/logo.png" alt="Registration" className="w-full h-auto object-contain" />
                </div>

                <div className="w-full md:w-2/3 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-auto flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4"
                        style={{ color: "#de6107" }}
                    >View Products</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="text-left p-3">Image</th>
                                <th className="text-left">Name</th>
                                <th className="text-left">Price</th>
                                <th className="text-left">Category</th>

                                <th className="text-left">Status</th>
                                <th className="text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((product, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-900">
                                    <td className='p-9'><img src={`https://firebasestorage.googleapis.com/v0/b/bawarchi-61209.appspot.com/o/${product.Name}?alt=media&token=${product.token}`} alt={product.Name} className="w-16 h-16 object-cover rounded-md shadow-md" /></td>
                                    <td>{product.Name}</td>
                                    <td>{product.Price}</td>
                                    <td>{product.Category}</td>
                                    <td>{product.Status}</td>
                                    <td>
                                        <button onClick={() => updateProductStatus(product._id)} className="text-white px-4 py-2 rounded-md bg-gray-600">Status</button>
                                        <button onClick={() => window.location.href = `/product/product-view/${product._id}`}
                                        className="text-white px-4 py-2 rounded-md bg-gray-700 ml-5">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );

}

export default ProductView;