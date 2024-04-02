"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../pages/components/footer";
import Navbar from "../../pages/components/navbar";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const CashierUpdate = () => {
  const [cashiers, setCashiers] = useState([]);

  const getCashiers = () => {
    fetch(`${BACKEND}/admin/cashiers/`)
      .then((res) => res.json())
      .then((data) => {
        setCashiers(data.cashiers);
        console.log("Data", data.cashiers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCashiers();
  }, []);

  const updateCashier = (cashierId) => {
    fetch(`${BACKEND}/admin/cashierStatus/${cashierId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data", data);
        getCashiers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="/logo.png"
            alt="Registration"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="w-full md:w-2/3 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-50 border border-gray-700 rounded p-4 h-auto flex flex-col justify-center">
          <h1 className="text-2xl text-white text-center mb-4">
            Update Cashier
          </h1>
          <div className="flex flex-col gap-4">
            {cashiers.map((cashier) => (
              <div className="flex flex-row gap-4 items-center justify-between">
                <div className="text-white">
                  <p>Name: {cashier.Name}</p>
                  <p>Phone: {cashier.Phone}</p>
                </div>
                <div className="text-white">
                  <p>Password: {cashier.Password}</p>
                  <p>Status: {cashier.Status}</p>
                </div>
                <button
                  onClick={() => {
                    updateCashier(cashier._id);
                  }}
                  className="text-white text-center bg-gray-500 hover:bg-orange-500 py-2 rounded-md px-4"
                >
                  Update Status
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CashierUpdate;
