import { StockChart } from './StockChart'
import './portfolio.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const Portfolio = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)

    useEffect(() => {
        console.log('showing user:  ', user)
        formatBuyingPower();
    }, [dispatch])

    const formatBuyingPower = () => {
        let word = user.buyingPower.split('');
        console.log(word)
        for (let i = user.buyingPower.length; i > 0; i--) {

        }
    }

    return (
        <>
            <div className="main-info-container">
                <h2>${user.buyingPower}</h2>
                <StockChart option='portfolio'/>
                <div className='buying-power'>
                    <h3>Buying Power</h3>
                    <h3>{user.buyingPower}</h3>
                </div>
            </div>
        </>
    )
}
