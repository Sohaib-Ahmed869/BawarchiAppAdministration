"use client"
import React, { useState } from 'react';
import Footer from '../../pages/components/footer';
import Navbar from '../../pages/components/navbar';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const CategoryAdd = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(BACKEND)
        fetch(`${BACKEND}/category/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name:categoryName })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == '200') {
                    alert("Category Added Successfully!");
                    setCategoryName('');
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
        <div className="flex min-h-screen flex-col justify-between bg-black">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className="w-full md:w-1/2 flex justify-center items-center">

                        <img src="/logo.png" alt="Registration" className="w-full h-auto object-contain" />
                    </div>

                    <div className="w-full md:w-1/2 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-96 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-4"
                        style={{color: "#de6107"}}
                        >Add Category</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-white-700 mb-2">Category Name</label>
                                <input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 text-white" />
                            </div>
                            <button type="submit" className="text-white px-4 py-2 rounded-md">Add Category</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

}

export default CategoryAdd;