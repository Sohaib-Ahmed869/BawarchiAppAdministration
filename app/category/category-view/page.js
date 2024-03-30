"use client"
import React, { useState, useEffect } from 'react';
import Footer from '../../pages/components/footer';
import Navbar from '../../pages/components/navbar';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const CategoryView = () => {
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

    const updateCategory = (Name) => {
        fetch(`${BACKEND}/category/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == '200') {
                    alert("Category Updated Successfully!");
                    getCategories();
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
            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="w-full md:w-1/2 flex justify-center items-center">

                    <img src="/logo.png" alt="Registration" className="w-full h-auto object-contain" />
                </div>
                <div className="w-full md:w-1/2 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-96 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4"
                        style={{ color: "#de6107" }}
                    >Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
                        {categories && categories.map(category => (
                            <div key={category._id} className="bg-opacity-50 p-4 rounded-md shadow-md text-white" style={{ backgroundImage: "linear-gradient(to right, #000000, #333333)" }}>
                                <h3 className="text-xl font-bold mb-2">{category.Name}</h3>
                                <p>{category.Status}</p>
                                <button onClick={() => updateCategory(category.Name)} className="bg-black text-white px-4 py-2 rounded-md mt-4">Update Status</button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CategoryView;