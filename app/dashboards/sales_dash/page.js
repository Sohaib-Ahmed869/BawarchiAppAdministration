"use client"
import { useState, useEffect } from "react"

import Footer from "../../pages/components/footer"
import Navbar from "../../pages/components/navbar"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

const SalesDashboard = () => {

    const [totalSalesbyDate, setTotalSalesbyDate] = useState([])
    const [cardSalesbyDate, setCardSalesbyDate] = useState([])
    const [cashSalesbyDate, setCashSalesbyDate] = useState([])
    const [numberOfOrders, setNumberOfOrders] = useState([])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const [totalSalesbyMonth, setTotalSalesbyMonth] = useState([])
    const [cardSalesbyMonth, setCardSalesbyMonth] = useState([])
    const [cashSalesbyMonth, setCashSalesbyMonth] = useState([])
    const [numberOfOrdersMonth, setNumberOfOrdersMonth] = useState([])

    const [foodPandaSalesbyDate, setFoodPandaSalesbyDate] = useState(0)
    const [foodPandaSalesbyMonth, setFoodPandaSalesbyMonth] = useState(0)
    const [foodPandaSalesbyYear, setFoodPandaSalesbyYear] = useState(0)

    const [takeAwaySalesbyDate, setTakeAwaySalesbyDate] = useState(0)
    const [takeAwaySalesbyMonth, setTakeAwaySalesbyMonth] = useState(0)
    const [takeAwaySalesbyYear, setTakeAwaySalesbyYear] = useState(0)

    const [month, setMonth] = useState(new Date().toISOString().split('T')[0].split('-')[1])

    const [year, setYear] = useState(new Date().toISOString().split('T')[0].split('-')[0])

    const [totalSalesbyYear, setTotalSalesbyYear] = useState([])
    const [cardSalesbyYear, setCardSalesbyYear] = useState([])
    const [cashSalesbyYear, setCashSalesbyYear] = useState([])
    const [numberOfOrdersYear, setNumberOfOrdersYear] = useState([])

    const getSalesData = () => {
        fetch(`${URL}/sales/sales/${date}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        })
            .then(res => res.json())
            .then(data => {
                setTotalSalesbyDate(data.Total)
                setCardSalesbyDate(data.Card)
                setCashSalesbyDate(data.Cash)
                setFoodPandaSalesbyDate(data.Foodpanda)
                setTakeAwaySalesbyDate(data.TakeAway)
                setNumberOfOrders(data.Number_of_Orders)

            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getSalesDataMonthly = () => {
        fetch(`${URL}/sales/sales/month/${month}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        })
            .then(res => res.json())
            .then(data => {
                setTotalSalesbyMonth(data.Total)
                setCardSalesbyMonth(data.Card)
                setCashSalesbyMonth(data.Cash)
                setFoodPandaSalesbyMonth(data.Foodpanda)
                setTakeAwaySalesbyMonth(data.TakeAway)
                setNumberOfOrdersMonth(data.Number_of_Orders)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getSalesDataYearly = () => {
        fetch(`${URL}/sales/sales/year/${year}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        })
            .then(res => res.json())
            .then(data => {
                setTotalSalesbyYear(data.Total)
                setCardSalesbyYear(data.Card)
                setCashSalesbyYear(data.Cash)
                setFoodPandaSalesbyYear(data.Foodpanda)
                setTakeAwaySalesbyYear(data.TakeAway)
                setNumberOfOrdersYear(data.Number_of_Orders)
            })
            .catch(err => {
                console.log(err.message)
            })
    }



    useEffect(() => {
        getSalesData()
    }, [date])

    useEffect(() => {
        getSalesDataMonthly()
    }
        , [month])

    useEffect(() => {
        getSalesDataYearly()
    }
        , [year])

    return (
        <main className="flex min-h-screen flex-col justify-between bg-black">
            <Navbar />
            <div className="container mx-auto mt-4 p-4 bg-gray-900 rounded-md shadow-md">
                <h1 className="text-4xl font-bold text-center mt-9 text-white uppercase">Daily Sales</h1>
                <form className="flex justify-center">
                    <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} className="form-control mt-3 mb-2 p-2 rounded-md border text-white bg-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </form>
                <div className="container mt-4 p-4 bg-gray-900 rounded-md shadow-md text-white text-center gap-4">
                    <h2>Total Sales: {totalSalesbyDate}</h2>
                    <h2>Card Sales: {cardSalesbyDate}</h2>
                    <h2>Cash Sales: {cashSalesbyDate}</h2>
                    <h2>FoodPanda Sales: {foodPandaSalesbyDate}</h2>
                    <h2>TakeAway Sales: {takeAwaySalesbyDate}</h2>
                    <h2>Number of Orders: {numberOfOrders}</h2>
                </div>
            </div>
            <div className="container mx-auto mt-4 p-4 bg-gray-900 rounded-md shadow-md">
                <h1 className="text-4xl font-bold text-center mt-9 text-white uppercase">Monthly Sales</h1>
                <form className="flex justify-center">
                    <select className="form-control mt-3 mb-2 p-2 rounded-md border text-white bg-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" value={month} onChange={e => setMonth(e.target.value)}>
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
                </form>
                <div className="container mt-4 p-4 bg-gray-900 rounded-md shadow-md text-white text-center gap-4">
                    <h2>Total Sales: {totalSalesbyMonth}</h2>
                    <h2>Card Sales: {cardSalesbyMonth}</h2>
                    <h2>Cash Sales: {cashSalesbyMonth}</h2>
                    <h2>FoodPanda Sales: {foodPandaSalesbyMonth}</h2>
                    <h2>TakeAway Sales: {takeAwaySalesbyMonth}</h2>
                    <h2>Number of Orders: {numberOfOrdersMonth}</h2>
                </div>
            </div>
            <div className="container mx-auto mt-4 p-4 bg-gray-900 rounded-md shadow-md">
                <h1 className="text-4xl font-bold text-center mt-9 text-white uppercase">Yearly Sales</h1>
                <form className="flex justify-center">
                    <select className="form-control mt-3 mb-2 p-2 rounded-md border text-white bg-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" value={year} onChange={e => setYear(e.target.value)}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </form>
                <div className="container mt-4 p-4 bg-gray-900 rounded-md shadow-md text-white text-center gap-4">
                    <h2>Total Sales: {totalSalesbyYear}</h2>
                    <h2>Card Sales: {cardSalesbyYear}</h2>
                    <h2>Cash Sales: {cashSalesbyYear}</h2>
                    <h2>FoodPanda Sales: {foodPandaSalesbyYear}</h2>
                    <h2>TakeAway Sales: {takeAwaySalesbyYear}</h2>
                    <h2>Number of Orders: {numberOfOrdersYear}</h2>
                </div>
            </div>
            
            <Footer />
        </main>
    )
}

export default SalesDashboard
