import { useEffect, useState } from "react"
import axios from "axios";
// import { finnhubFetch } from "../finnhubSetup";





export const SidebarStock = (type, stock) => {

    const [stockInfo, setStockInfo] = useState([])

    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c8obubqad3iddfsarfeg"
    const finnhubClient = new finnhub.DefaultApi()

    const finnhubFetch = (stock) => {
        let returnValue;
        finnhubClient.quote(stock, (error, data, response) => {
            returnValue = data;
        });
        return returnValue;
    }




    useEffect(() => {
        let array = [];
        let stocksList = ['AAPL', 'TSLA', 'UBER']

        stocksList.map(stock => {
            array.push(finnhubFetch(stock))
        })
        console.log(array)
    }, [])

    return (
        <>
            <div>
                <h3>AAPL</h3>
                <h3></h3>
            </div>
        </>
    )
}
