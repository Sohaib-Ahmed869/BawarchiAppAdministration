"use client"
import React, { useState, useEffect } from "react"
import Footer from "../pages/components/footer"
import Navbar from "../pages/components/navbar"

const category_dash = () => {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img src="/logo.png" alt="Registration" className="w-full h-auto object-contain" />
                </div>

                <div className="w-full md:w-2/3 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-auto flex flex-col justify-center">
                    <h1 className="text-2xl text-white text-center mb-4">Category Dashboard</h1>
                    <div className="flex flex-col gap-4">
                        <a href="/category/category-add" className="text-white text-center bg-gray-500 hover:bg-orange-500 py-2 rounded-md">Add Category</a>
                        <a href="/category/category-view" className="text-white text-center bg-gray-500 hover:bg-orange-500 py-2 rounded-md">View Category</a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default category_dash