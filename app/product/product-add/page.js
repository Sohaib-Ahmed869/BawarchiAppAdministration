"use client"
import React, { useState, useEffect } from 'react';
import Footer from '../../pages/components/footer';
import Navbar from '../../pages/components/navbar';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const ProductAdd = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        fetch(`${BACKEND}/category/`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getCategories();
    }
        , []);


    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Category, setCategory] = useState('');
    const [Image, setImage] = useState('');
    const [Status, setStatus] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(BACKEND)
        const formdata = new FormData();
        formdata.append('Name', Name);
        formdata.append('Description', Description);
        formdata.append('Price', Price);
        formdata.append('Category', Category);
        formdata.append('Image', Image);
        formdata.append('Status', Status);

        fetch(`${BACKEND}/admin/product/`, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == '200') {
                    alert("Product Added Successfully!");
                    window.location.reload();
                } else {

                    alert("Error! Please try again.");
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className="w-full md:w-1/2 flex justify-center items-center">

                        <img src="/logo.png" alt="Registration" className="w-full h-auto object-contain" />
                    </div>

                    <div className="w-full md:w-1/2 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-autoflex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-4"
                        style={{color: "#de6107"}}
                        >Add Product</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label htmlFor="Name" className="block text-white-700 mb-2">Product Name</label>
                                <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Description" className="block text-white-700 mb-2">Description</label>
                                <input type="text" id="Description" value={Description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Price" className="block text-white-700 mb-2">Price</label>
                                <input type="text" id="Price" value={Price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Category" className="block text-white-700 mb-2">Category</label>
                                <select id="Category" value={Category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white">
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category.Name}>{category.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Image" className="block text-white-700 mb-2">Image</label>
                                <input type="file" id="Image" onChange={(e) => setImage(e.target.files[0])} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Status" className="block text-white-700 mb-2">Status</label>
                                <select id="Status" value={Status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white">
                                    <option value="">Select Status</option>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>
                            <button type="submit" className="text-white px-4 py-2 rounded-md">Add Product</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

}

export default ProductAdd;