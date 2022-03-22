import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAsset } from '../../store/asset';
import './stockPage.css'


export const StockPage = () => {

    const { symbol } = useParams();
    const dispatch = useDispatch();
    const stock = useSelector(state => state.assetReducer);

    useEffect(() => {
        dispatch(getAsset(symbol))
        // console.log(symbol)
    }, [dispatch])

    return (
        <>
            <h1>AAPL</h1>
        </>
    )
}
