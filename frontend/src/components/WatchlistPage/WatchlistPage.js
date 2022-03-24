import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchStocks } from '../../store/stock';
import { fetchLists } from '../../store/watchlist';
import { finnhubClient } from '../finnhubSetup';

import './watchlistPage.css'

export const WatchlistPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const stocks = useSelector(state => state?.stocksReducer?.stocks);

    useEffect(() => {
        dispatch(fetchStocks(id))
    }, [])

    return (
        <>
            <div className="main-info-container">
                <img className="heart" src="https://cdn.robinhood.com/emoji/v0/128/2764.png" alt="heart" />
                {stocks.length > 0 && (
                    stocks.map(stock => (
                        <Link to={`/asset/${stock.ticker}`} className='stock-tab'>
                            <p>{stock.ticker}</p>
                            <p>{stock.c}</p>
                            <p>{stock.dp}</p>
                        </Link>
                    ))
                )}
            </div>
        </>
    )
}
