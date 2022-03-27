import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { getAsset } from '../../store/asset';
import { restoreUser } from '../../store/session';
import { finnhubFetch, finnhubClient, formatter} from '../finnhubSetup';
import { StockChart } from '../Portfolio/StockChart';
import { StockSideBar } from '../Sidebar/StockSidebar';
import './stockPage.css'

export const StockPage = () => {

    const location = useLocation();
    const { symbol } = useParams();
    const dispatch = useDispatch();
    const stock = useSelector(state => state?.assetReducer);
    const sessionUser = useSelector(state => state?.session?.user);
    const [stockInfo, setStockInfo] = useState({});

    useEffect(() => {
        finnhubClient.quote(symbol, (error, data, response) => {
            // console.log(data)
            setStockInfo(data)
        });

    }, [dispatch, location])

    return (
        <>
            <div className="main-info-container">
                <h1>{symbol}</h1>
                <h3>daily change: {stockInfo.dp}%</h3>
                <h3>current: {formatter.format(stockInfo.c)}</h3>
                <StockChart option='asset'/>
                <div className='buying-power-stock'>
                    <h4>Buying Power</h4>
                    <h4>{formatter.format(sessionUser.buyingPower)}</h4>
                </div>
                {/* <h3>high: {stockInfo.h}</h3>
                <h3>low: {stockInfo.l}</h3> */}
            </div>
            <StockSideBar symbol={symbol} stockInfo={stockInfo} />
        </>
    )
}
