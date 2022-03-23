import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAsset } from '../../store/asset';
import { finnhubFetch, finnhubClient} from '../finnhubSetup';
import { StockChart } from '../Portfolio/StockChart';
import { StockSideBar } from '../Sidebar/StockSidebar';
import './stockPage.css'


export const StockPage = () => {

    const { symbol } = useParams();
    const dispatch = useDispatch();
    const stock = useSelector(state => state.assetReducer);
    const [stockInfo, setStockInfo] = useState({});


    useEffect(() => {
        dispatch(getAsset(symbol));

        finnhubClient.quote(symbol, (error, data, response) => {
            // console.log(data)
            setStockInfo(data)
        });

    }, [dispatch])

    return (
        <>
            <div id="main-info-container">
                <h1>{symbol}</h1>
                <h3>daily change: {stockInfo.dp}%</h3>
                <h3>current: {stockInfo.c}</h3>
                <StockChart option='asset'/>
                <h3>high: {stockInfo.h}</h3>
                <h3>low: {stockInfo.l}</h3>
            </div>
            <StockSideBar symbol={symbol} stockInfo={stockInfo} />
        </>
    )
}
