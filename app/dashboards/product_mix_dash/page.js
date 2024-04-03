"use client";
import { useState, useEffect } from "react";

import Footer from "../../pages/components/footer";
import Navbar from "../../pages/components/navbar";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ProductMixDashboard = () => {
  const [mostSoldProductsByDate, setMostSoldProductsByDate] = useState([]);
  const [mostSoldProductsByMonth, setMostSoldProductsByMonth] = useState([]);
  const [mostSoldProductsByYear, setMostSoldProductsByYear] = useState([]);
  const [filter, setFilter] = useState("date"); // ["date", "month", "year"
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [month, setMonth] = useState(
    new Date().toISOString().split("T")[0].split("-")[1]
  );
  const [year, setYear] = useState(
    new Date().toISOString().split("T")[0].split("-")[0]
  );

  const onDateChange = (e) => {
    setLoading(true);
    setDate(e.target.value);
  };

  const onChangeMonth = (e) => {
    setLoading(true);
    setMonth(e.target.value);
  };
  const getMostSoldProductsByDate = () => {
    fetch(`${URL}/sales/mostsold/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMostSoldProductsByDate(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getMostSoldProductsByMonth = () => {
    fetch(`${URL}/sales/mostsold/month/${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMostSoldProductsByMonth(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getMostSoldProductsByYear = () => {
    fetch(`${URL}/sales/mostsold/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMostSoldProductsByYear(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMostSoldProductsByDate();
    getMostSoldProductsByMonth();
    getMostSoldProductsByYear();
    setLoading(false);
  }, [date, month, year]);

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
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-white font-bold">
              Select Report Type
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                className={`text-white p-2 rounded-md ${
                  filter === "date" ? "" : "bg-gray-700"
                }`}
                onClick={() => setFilter("date")}
              >
                Date
              </button>
              <button
                className={`text-white p-2 rounded-md ${
                  filter === "month" ? "" : "bg-gray-700"
                }`}
                onClick={() => setFilter("month")}
              >
                Month
              </button>
              <button
                className={`text-white p-2 rounded-md ${
                  filter === "all" ? "" : "bg-gray-700"
                }`}
                onClick={() => setFilter("all")}
              >
                All Time
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-2xl text-white font-bold">Product Report</h1>
          </div>
          <div className="flex flex-col gap-4m mt-4">
            <div className="flex flex-col gap-2">
              {filter === "date" ? (
                <div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="date"
                      className="bg-gray-800 text-white p-2 rounded-md"
                      value={date}
                      onChange={(e) => onDateChange(e)}
                    />
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-800 text-white p-2 rounded-md text-left">
                          <th className="p-3">Product Name</th>
                          <th>Quantity</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mostSoldProductsByDate.length === 0 ? (
                          <tr className="bg-gray-700 bg-opacity-50 p-2 rounded-md">
                            <td className="text-white">No Data</td>
                            <td className="text-white">No Data</td>
                            <td className="text-white">No Data</td>
                          </tr>
                        ) : !loading ? (
                          mostSoldProductsByDate.map((product, index) => (
                            <tr
                              key={index}
                              className="bg-gray-700 bg-opacity-50 p-2 rounded-md"
                            >
                              <td className="text-white p-3">{product.name}</td>
                              <td className="text-white">{product.quantity}</td>
                              <td className="text-white">{product.sales}</td>
                            </tr>
                          ))
                        ) : (
                          <tr className="bg-gray-700 bg-opacity-50 p-2 rounded-md">
                            <td className="text-white">Loading...</td>
                            <td className="text-white">Loading...</td>
                            <td className="text-white">Loading...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              {filter === "month" ? (
                <div>
                  <div className="flex flex-col gap-2">
                    <select
                      className="bg-gray-800 text-white p-2 rounded-md"
                      value={month}
                      onChange={(e) => onChangeMonth(e)}
                    >
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>

                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-800 text-white p-2 rounded-md text-left">
                          <th className="p-3">Product Name</th>
                          <th>Quantity</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mostSoldProductsByMonth.length === 0 ? (
                          <tr className="bg-gray-700 bg-opacity-50 p-2 rounded-md">
                            <td className="text-white">No Data</td>
                            <td className="text-white">No Data</td>
                            <td className="text-white">No Data</td>
                          </tr>
                        ) : !loading ? (
                          mostSoldProductsByMonth.map((product, index) => (
                            <tr
                              key={index}
                              className="bg-gray-700 bg-opacity-50 p-2 rounded-md"
                            >
                              <td className="text-white p-3">{product.name}</td>
                              <td className="text-white">{product.quantity}</td>
                              <td className="text-white">{product.sales}</td>
                            </tr>
                          ))
                        ) : (
                          <tr className="bg-gray-700 bg-opacity-50 p-2 rounded-md">
                            <td className="text-white">Loading...</td>
                            <td className="text-white">Loading...</td>
                            <td className="text-white">Loading...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              {filter === "all" ? (
                <div>
                  <div className="flex flex-col gap-2">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-800 text-white p-2 rounded-md text-left">
                          <th className="p-3">Product Name</th>
                          <th>Quantity</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mostSoldProductsByYear &&
                          mostSoldProductsByYear.map((product, index) => (
                            <tr
                              key={index}
                              className="bg-gray-700 bg-opacity-50 p-2 rounded-md"
                            >
                              <td className="text-white p-3">{product.name}</td>
                              <td className="text-white">{product.quantity}</td>
                              <td className="text-white">{product.sales}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductMixDashboard;
