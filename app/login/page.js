"use client"
import React, { useState } from 'react';
import Footer from '../pages/components/footer';
import Navbar from '../pages/components/navbar';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const Login = () => {
    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(BACKEND)
        fetch(`${BACKEND}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name:adminName, Password:password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == '200') {
                    localStorage.setItem('token', data.token);
                    alert("Login Successful!");
                    window.location.href = '/';
                    // router.push('/dashboard');
                } else {

                    alert("Invalid Credentials! Please try again.");
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
                        >Login</h2>
                        <form onSubmit={handleSubmit} >


                            <div className="mb-4">

                                <label htmlFor="adminName" className="block text-white-700 mb-2">Admin Name</label>

                                <input

                                    type="adminName"

                                    id="adminName"

                                    value={adminName}

                                    onChange={(e) => setAdminName(e.target.value)}

                                    className="w-full px-3 py-2 rounded-md border text-black  bg-grey-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"

                                    required

                                />

                            </div>

                            <div className="mb-4">

                                <label htmlFor="password" className="block text-white-700 mb-2">

                                    Password

                                </label>

                                <input

                                    type="password"

                                    id="password"

                                    value={password}

                                    onChange={(e) => setPassword(e.target.value)}

                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black bg-grey-800"

                                    required

                                />

                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white rounded-md"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
    

export default Login;
