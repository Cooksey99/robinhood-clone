import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchStocks } from '../../store/stock';
import { fetchLists } from '../../store/watchlist';
import { finnhubClient } from '../finnhubSetup';
import { SingleStockTab } from './SingleStockTab';

import './watchlistPage.css'

export const WatchlistPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const stocks = useSelector(state => state?.stocksReducer?.stocks);
    const lists = useSelector(state => state?.listReducer?.lists)
    const [ticker, setTicker] = useState('');
    const [list, setList] = useState({});

    useEffect(() => {
        dispatch(fetchStocks(id));

        if (lists.length > 0) {
            lists.forEach(list => {
                // console.log(list.id, id)
                if (parseInt(list.id) === parseInt(id)) setList(list);
            });
        }
        console.log(ticker)
    }, [dispatch])

    return (
        <>
            <div className="main-info-container">
                <img className="heart" src="https://image.pngaaa.com/406/239406-middle.png" alt="lighbulb icon" />
                <h2>{list.list_name}</h2>
                <div className='header-line'>
                    {/* <p>Name</p> */}
                    <p>Symbol</p>
                    <p>Price</p>
                    <p>Today</p>
                    {/* <p>Market Cap</p> */}
                </div>
                {stocks.length > 0 && (
                    stocks.map(stock => (
                        <SingleStockTab stock={stock} key={stock.id}/>
                    ))
                )}
            </div>
        </>
    )
}
