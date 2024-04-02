"use client"
import React, { useState, useEffect } from "react"
import Footer from "../../pages/components/footer"
import Navbar from "../../pages/components/navbar"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

const CashierAdd = () => {
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [Phone, setPhone] = useState("")
    const [Status, setStatus] = useState("")

    const addCashier = () => {
        fetch(`${BACKEND}/admin/cashier/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name,
                Password,
                Phone,
                Status,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "200") {
                    alert("Cashier Added Successfully!")
                    setName("")
                    setPassword("")
                    setPhone("")
                    setStatus("")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img src="/logo.png" alt="Registration" className="w-full h-auto object-contain" />
                </div>

                <div className="w-full md:w-2/3 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-auto flex flex-col justify-center">
                    <h1 className="text-2xl text-white text-center mb-4">Add Cashier</h1>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            addCashier()
                        }}
                    >
                        <label className="text-white">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="p-2 rounded-md bg-gray-800 text-white"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="text-white">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-2 rounded-md bg-gray-800 text-white"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="text-white">Phone</label>
                        <input
                            type="text"
                            placeholder="Phone"
                            className="p-2 rounded-md bg-gray-800 text-white"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label className="text-white">Status</label>
                        <select
                            className="p-2 rounded-md bg-gray-800 text-white"
                            value={Status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <button className="p-2 bg-blue-500 text-white rounded-md">Add Cashier</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CashierAdd
        
        
