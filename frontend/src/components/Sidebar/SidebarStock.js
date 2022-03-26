import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { getAsset } from "../../store/asset";
// import { finnhubFetch } from "../finnhubSetup";
import { finnhubClient } from "../finnhubSetup"


export const SidebarStock = ({ticker}) => {

    const dispatch = useDispatch();

    const [stockInfo, setStockInfo] = useState({})

    useEffect(() => {
        console.log('testing ticker:    ', ticker)
        finnhubClient.quote(ticker, (error, data, response) => {
            // console.log(data)
            setStockInfo(data)
        });

    }, [])

    return (
        <>
            <Link to={`/asset/${ticker}`} className="stock-tab">
                <div className="vertical-pair left-side">
                    <h3>{ticker}</h3>
                    <h4 className="shares"></h4>
                </div>
                <div className="mini-chart"></div>
                <div className="vertical-pair right-side">
                    <h4>{stockInfo.c}</h4>
                    <h4>{stockInfo.dp}%</h4>
                </div>
            </Link>
        </>
    )
}
