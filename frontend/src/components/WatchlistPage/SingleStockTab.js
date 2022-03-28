import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { finnhubClient } from "../finnhubSetup";

export const SingleStockTab = ({ stock }) => {

    const [stockInfo, setStockInfo] = useState({});

    const removeFromList = () => {
        
    }

    useEffect(() => {
        finnhubClient.quote(stock.ticker, (error, data, response) => {
            // console.log(data)
            setStockInfo(data)
        });
    }, [])

    return (
        <>
            <Link to={`/asset/${stock.ticker}`} key={stock.id} className='stock-tab'>
                <p>{stock.ticker}</p>
                <p>${stockInfo.c}</p>
                <div className="stock-tab-div">
                    <p>{stockInfo.dp}%</p>
                    <div className="stock-gap"></div>
                    <h3 onClick={() => removeFromList()}>X</h3>
                </div>
            </Link>
        </>
    )
}
