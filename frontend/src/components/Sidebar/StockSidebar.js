import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAsset, getTransactions } from "../../store/asset";
import { restoreUser } from "../../store/session";
import { addStockToList, checkOwned, fetchStocks, purchaseStock, sellStock } from "../../store/stock";
import { fetchLists } from "../../store/watchlist";
import { formatter } from "../finnhubSetup";


export const StockSideBar = ({ symbol, stockInfo }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [addToList, setAddToList] = useState(false);
    const [inList, setInList] = useState(false);
    const [reviewOrder, setReviewOrder] = useState(false);
    // const [share, setShare] = useState('share');
    const [buying, setBuying] = useState(true);

    const transactions = useSelector(state => state?.assetReducer);
    const lists = useSelector(state => state?.listReducer?.lists);
    const sessionUser = useSelector(state => state?.session?.user);
    const assets = useSelector(state => state?.stocksReducer?.assets);
    // const assets = useState(assetsSelector);

    const [assetObj, setAssetObj] = useState(assets?.assetsArray);
    const [owned, setOwned] = useState(false);

    const [purchased, setPurchased] = useState(false);
    const [buttonColor, setButtonColor] = useState(stockInfo.c >= 0 ? 'positive' : 'negative');
    const [greenLeft, setGreenLeft] = useState(null)
    const [greenRight, setGreenRight] = useState(null)
    const [error, setError] = useState(false)

    const submitPurchase = (e) => {
        e.preventDefault();

        // error handle
        if (quantity <= 0 || (quantity * price) > sessionUser.buyingPower) {
            setError(true);
        } else {

            // console.log('=-=-=-=-=-=-=-=-=', symbol)
            let asset_id = sessionUser.id;
            let ticker = symbol;
            // for (let i = 0; i < quantity; i++) {
            dispatch(purchaseStock(asset_id, ticker, price, quantity, sessionUser));
            dispatch(getAsset(sessionUser.id));
            // dispatch(fetchLists(sessionUser.id));
            dispatch(checkOwned(symbol, sessionUser.id));

            checkStockInAsset();

            setPurchased(true);
            setQuantity(0);
            dispatch(restoreUser())
            // reset data
            // assetObj.amount += quantity;
            // setQuantity(0);
            // setPrice(0);
        }

    }

    const submitSale = (e) => {
        checkStockInAsset();

        e.preventDefault();

        if (quantity <= 0 || quantity > assets.length) {
            setError(true);

        } else {
            // console.log('TRYING TO SELL')

            // let assetId = stockInfo.asset_id;
            // let stockId = stockInfo.id;
            // for (let i = 0; i < quantity; i++) {
            // let stockId = assets[0].id
            let stockId = [];
            for (let i = 0; i < quantity; i++) {
                stockId.push(assets[i].id);
            }
            // let stockId = stockIdArray[i];
            // console.log('stockId:       ', stockId);
            let assetId = assets[0].asset_id;
            let ticker = symbol;

            // console.log('==============', ticker, price, quantity)
            dispatch(sellStock(assetId, stockId, ticker, price, quantity, sessionUser));
            // dispatch(fetchLists(sessionUser.id));
            dispatch(checkOwned(symbol, sessionUser.id));

            checkStockInAsset();
            setQuantity(0);
            dispatch(getAsset(sessionUser.id));
            dispatch(restoreUser())


            // }

            // reset data
            // assetObj.amount -= quantity;
            // console.log(assetObj.amount)
            // setQuantity(0);
            // setPrice(0);

        }

    }

    const checkStockInAsset = async () => {

        // let stockObj = {};
        // let amount = 0;
        // let assetId = 0;
        // let stockId = [];

        // dispatch(getTransactions(sessionUser.id))

        // if (assets.length > 0) {
        //     assets?.forEach(asset => {
        //         if (asset.ticker === symbol) {
        //             setOwned(true)
        //             stockObj = { symbol: symbol };
        //             amount += 1;
        //             assetId = asset.asset_id;
        //             stockId.push(asset.id)
        //         }
        //     });
        //     stockObj.amount = amount
        //     stockObj.assetId = assetId;
        //     stockObj.stockId = stockId;

        //     // console.log(stockObj)
        //     setAssetObj(stockObj)
        // }
    }

    useEffect(() => {
        // checkStockInAsset();
        console.log('TRYING TO GET THIS TO WORK', assetObj)
    }, []);

    useEffect(() => {
        dispatch(getAsset(sessionUser.id));
        dispatch(checkOwned(symbol, sessionUser.id))
        dispatch(fetchStocks(sessionUser.id))
        dispatch(restoreUser());
        // dispatch(getTransactions(sessionUser.id));
        dispatch(fetchLists(sessionUser.id));
        // checkStockInAsset();
        // if (assets.assetsArray.length > 0) setAssetsArray(assets.)
        if (stockInfo.c >= 0) setButtonColor('positive');
        else setButtonColor('negative');

        console.log('testing that is works: ', assetObj)
    }, [dispatch, addToList, owned]);

    return (
        <>
            <div id="stock-sidebar">
                <div id="stock-sidebar-background">
                    <div id="order-tab">
                        <div id="buy-or-sell">
                            <h4 onClick={() => {
                                dispatch(checkOwned(symbol, sessionUser.id))
                                checkStockInAsset();
                                setBuying(true);
                                setGreenLeft('green-color');
                                setGreenRight(null);
                            }} className={`buy-tab ${greenLeft}`}>Buy {symbol}</h4>
                            {/* {owned && ( */}
                            <h4 onClick={() => {
                                dispatch(checkOwned(symbol, sessionUser.id));
                                dispatch(getAsset(sessionUser.id))
                                checkStockInAsset();
                                setBuying(false);
                                setGreenRight('green-color');
                                setGreenLeft(null);
                            }} className={`sell-tab ${greenRight}`}>Sell {symbol}</h4>
                            {/* )} */}
                        </div>
                        <div className="order-type">
                            <h4>Order Type</h4>
                            <h4>Market Order</h4>
                        </div>
                        <br />
                        <div className="amount">
                            <h4>Shares</h4>
                            {buying && (
                                <input type='number' placeholder="0" required
                                    // value={quantity}
                                    onClick={() => setError(false)}
                                    onChange={(e) => {
                                        setError(false);
                                        checkStockInAsset();

                                        if (e.target.value < 0) {
                                            e.target.value = 0;
                                            setQuantity(0)
                                            setPrice(0);
                                        }
                                        else if ((e.target.value * stockInfo.c) > sessionUser.buyingPower) {
                                            e.target.value = e.target.value - 1;
                                            setPrice(e.target.value * stockInfo.c);
                                            setQuantity(e.target.value)
                                        }
                                        else {
                                            setPrice(e.target.value * stockInfo.c);
                                            setQuantity(e.target.value)
                                        }
                                    }}></input>
                            )}
                            {!buying && (
                                <input type='number' placeholder="0" required
                                    // value={quantity}
                                    onClick={() => setError(false)}
                                    onChange={(e) => {
                                        setError(false);
                                        checkStockInAsset();
                                        if (e.target.value < 0) {
                                            let max = 0;
                                            e.target.value = 0;
                                            setQuantity(0)
                                            setPrice(0);
                                        }
                                        else if (e.target.value > assets.length) { ////////
                                            e.target.value = assets.length;
                                            setQuantity(assets.length);
                                            setPrice(assets.length * stockInfo.c);
                                        }
                                        else {
                                            setQuantity(e.target.value);
                                            setPrice(e.target.value * stockInfo.c)
                                        }
                                        // else if ((quantity * price) < sessionUser.buyingPower) {
                                        //     let temp = e.target.value;
                                        //     // e.target.value
                                        //     setPrice(temp * price);
                                        //     setQuantity(temp)
                                        // }
                                        // else if ((quantity * price <= sessionUser.buyingPower)) {
                                        //     setPrice(e.target.value * stockInfo.c);
                                        //     setQuantity(e.target.value)
                                        // }

                                        // else {
                                        //     e.target.value = assetObj.amount;
                                        //     setQuantity(e.target.value)
                                        //     setPrice(e.target.value * stockInfo.c);
                                        // }
                                        // if (e.target.value > 1) setShare('shares');
                                        // else setShare('share');
                                    }}></input>
                            )}
                        </div>
                        <br />
                        <div className="amount market-price">
                            <h4>Market Price</h4>
                            <h4>{formatter.format(stockInfo.c)}</h4>
                        </div>

                        <div className="quantity">
                            <h4>Estimated Cost</h4>
                            <h4>{formatter.format(price)}</h4>
                        </div>
                        <div id="review-order-div">
                            {!reviewOrder && (
                                <button id="review-order" className={`main-button ${buttonColor}`}
                                    onClick={() => setReviewOrder(true)}
                                >Review Order</button>
                            )}
                        </div>

                        {/* Purchase stocks */}
                        {reviewOrder && !purchased && (
                            <div className="review-order-message">
                                {buying && (
                                    <>
                                        <p>You're placing an order to buy {quantity} of {symbol} for {formatter.format(quantity * stockInfo.c)}</p>
                                        <button onClick={submitPurchase} className={buttonColor}>Buy</button>
                                        <button className={buttonColor} onClick={() => setReviewOrder(false)}>Edit</button>
                                    </>
                                )}
                                {!buying && (
                                    <>
                                        <p>You're placing an order to sell {quantity} of {symbol} for {formatter.format(quantity * stockInfo.c)}</p>
                                        <button onClick={submitSale} className={buttonColor}>Sell</button>
                                        <button className={buttonColor} onClick={() => setReviewOrder(false)}>Edit</button>
                                    </>
                                )}
                            </div>
                        )}
                        {!reviewOrder && !buying && (
                            <div className="available-shares-message">
                                {assets.length > 0 && (<p>{assets.length} shares available</p>)}
                            </div>
                        )}
                        {error && (
                            <div className="available-shares-message">
                                <p>You must enter a valid quantity.</p>
                            </div>
                        )}
                    </div>
                    {purchased && (
                        <div className="review-order-message">
                            <p>You have successfully purchased {symbol}!</p>
                            <button className="buy-more" onClick={() => setPurchased(false)}>Buy more</button>
                        </div>
                    )}
                </div>
                <div id="add-to-lists-div">
                    <button id='add-to-lists' className={buttonColor}
                        onClick={() => setAddToList(true)}>Add to Lists</button>
                </div>
            </div>


            {addToList && (
                <>
                    <div id="add-to-list-popup">
                        <div id="list-popup-top">
                            <h2>Add {symbol} to Your Lists</h2>
                            <button
                                id="exit-button" className={buttonColor}
                                onClick={() => setAddToList(false)}>X</button>
                        </div>
                        <br />
                        {lists && (
                            lists?.map(list => (
                                <div key={list.id}
                                    className='list-add-div'
                                    onClick={() => {
                                        dispatch(addStockToList(list.id, symbol));
                                        history.push(`/list/${list.id}`)
                                    }}>
                                    {/* <img src="https://png.pngtree.com/png-vector/20201208/ourmid/pngtree-flat-light-bulb-shine-bright-isolated-vector-png-image_2531330.jpg" alt="lightbulb"/> */}
                                    <br />
                                    {/* {inList && <input type="checkbox" checked />}
                                    {!inList && <input type="checkbox" />} */}
                                    <h4>{list.list_name}</h4>
                                    <br />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    )
}
