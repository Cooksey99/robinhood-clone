import { StockChart } from './StockChart'
import './portfolio.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const Portfolio = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {

    }, [dispatch])

    return (
        <>
            <div id="main-info-container">
                <h2>${user.buyingPower}</h2>
                <StockChart option='portfolio'/>
            </div>
        </>
    )
}
