import { StockChart } from './StockChart'
import './portfolio.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatter } from '../finnhubSetup';
import { getTransactions } from '../../store/asset';

export const Portfolio = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)

    useEffect(() => {
        console.log('showing user:  ', user)
        dispatch(getTransactions(user.id));
    }, [dispatch])


    return (
        <>
            <div className="main-info-container">
                <h2>{formatter.format(user.buyingPower)}</h2>
                <StockChart option='portfolio'/>
                <div id='chart-select'>
                    <ul>1D</ul>
                    <ul>1W</ul>
                    <ul>1M</ul>
                    <ul>1Y</ul>
                    <ul>ALL</ul>
                </div>
                <div className='buying-power'>
                    <h3>Buying Power</h3>
                    <h3>{formatter.format(user.buyingPower)}</h3>
                </div>
            </div>
        </>
    )
}
