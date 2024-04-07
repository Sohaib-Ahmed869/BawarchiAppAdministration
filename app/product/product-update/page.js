"use client"
import React, { useState, useEffect } from 'react';
import Footer from '../../pages/components/footer';
import Navbar from '../../pages/components/navbar';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const ProductUpdate = ({ params }) => {
    const [product, setProduct] = useState({
        Name: '',
        Description: '',
        Price: 0,
        Quantity: '',
        Status: '',
        Discount: 0
    });
    const id = params.id;

    const getProduct = () => {
        fetch(`${BACKEND}/admin/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.product);
                console.log('Data', data.product);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getProduct();
    }
        , []);

    const updateProduct = (product) => {
        fetch(`${BACKEND}/admin/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Data', data);
                getProduct();
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

                <div className="w-full md:w-2/3 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-96 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-white">Update Product</h1>
                    <form className="flex flex-col gap-4 mt-4" onSubmit={(e) => {
                        e.preventDefault();
                        updateProduct(product);
                    }}>
                        <input type="text" className="p-2 bg-gray-700 rounded" placeholder="Name" value={product.Name} onChange={(e) => setProduct({ ...product, Name: e.target.value })} />
                        <input type="text" className="p-2 bg-gray-700 rounded" placeholder="Description" value={product.Description} onChange={(e) => setProduct({ ...product, Description: e.target.value })} />
                        <input type="number" className="p-2 bg-gray-700 rounded" placeholder="Price" value={product.Price} onChange={(e) => setProduct({ ...product, Price: e.target.value })} />
                        <input type="text" className="p-2 bg-gray-700 rounded" placeholder="Quantity" value={product.Quantity} onChange={(e) => setProduct({ ...product, Quantity: e.target.value })} />
                        <input type="text" className="p-2 bg-gray-700 rounded" placeholder="Status" value={product.Status} onChange={(e) => setProduct({ ...product, Status: e.target.value })} />
                        <input type="number" className="p-2 bg-gray-700 rounded" placeholder="Discount" value={product.Discount} onChange={(e) => setProduct({ ...product, Discount: e.target.value })} />
                        <button className="bg-blue-500 text-white p-2 rounded">Update</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>

    )

}

export default ProductUpdate;


