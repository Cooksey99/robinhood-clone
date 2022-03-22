import { useEffect, useState } from "react"
// import { finnhubFetch } from "../finnhubSetup";





export const SidebarStock = (stock) => {

    const [stockInfo, setStockInfo] = useState({})

    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c8obubqad3iddfsarfeg";
    const finnhubClient = new finnhub.DefaultApi()

    process.env.
    useEffect(() => {

        finnhubClient.quote("AAPL", (error, data, response) => {
            // console.log(data)
            setStockInfo(data)
        });

        finnhubClient.symbolSearch("AAPL", (error, data, response) => {
            // console.log(data)
            console.log('testing stock info', data)

        });

    }, [])

    return (
        <>
            <div className="stock-tab">
                <div className="vertical-pair left-side">
                    <h3>AAPL</h3>
                    <h4 className="shares"></h4>
                </div>
                <div className="mini-chart"></div>
                <div className="vertical-pair right-side">
                    <h4>{stockInfo.c}</h4>
                    <h4>{stockInfo.dp}%</h4>
                </div>
            </div>
        </>
    )
}
