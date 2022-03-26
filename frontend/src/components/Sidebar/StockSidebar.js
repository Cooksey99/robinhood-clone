import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAsset } from "../../store/asset";
import { restoreUser } from "../../store/session";
import { addStockToList, purchaseStock, sellStock } from "../../store/stock";
import { fetchLists } from "../../store/watchlist";
import { formatter } from "../finnhubSetup";


export const StockSideBar = ({ symbol, stockInfo }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(formatter.format(0));
    const [price, setPrice] = useState(formatter.format(0));
    const [addToList, setAddToList] = useState(false);
    const [inList, setInList] = useState(false);
    const [reviewOrder, setReviewOrder] = useState(false);
    const [share, setShare] = useState('share');
    const [buying, setBuying] = useState(true);

    const lists = useSelector(state => state?.listReducer?.lists);
    const sessionUser = useSelector(state => state?.session?.user);
    const assets = useSelector(state => state?.assetReducer?.asset);
    const [assetObj, setAssetObj] = useState({});
    const [owned, setOwned] = useState(false);

    const submitPurchase = async (e) => {
        e.preventDefault();
        // console.log('=-=-=-=-=-=-=-=-=', symbol)
        let asset_id = sessionUser.id;
        let ticker = symbol;
        for (let i = 0; i < quantity; i++) {
            dispatch(purchaseStock(asset_id, ticker, price, quantity, sessionUser));
        }
        dispatch(getAsset(sessionUser.id));
        checkStockInAsset();

        // reset data
        // assetObj.amount += quantity;
        // setQuantity(0);
        // setPrice(0);
    }

    const submitSale = async (e) => {
        e.preventDefault();
        console.log('TRYING TO SELL')

        // let assetId = stockInfo.asset_id;
        // let stockId = stockInfo.id;
        for (let i = 0; i < quantity; i++) {
            let stockIdArray = assetObj.stockId;
            let stockId = stockIdArray[i];
            // console.log('stockId:       ', stockId);
            let assetId = assetObj.assetId;

            dispatch(sellStock(assetId, stockId, price, quantity, sessionUser));
        }
        dispatch(getAsset(sessionUser.id));
        dispatch(fetchLists(sessionUser.id));
        checkStockInAsset();

        // reset data
        // assetObj.amount -= quantity;
        // console.log(assetObj.amount)
        // setQuantity(0);
        // setPrice(0);

    }

    const checkStockInAsset = () => {

        let stockObj = {};
        let amount = 0;
        let assetId = 0;
        let stockId = [];

        if (assets.length > 0) {
            assets?.forEach(asset => {
                if (asset.ticker === symbol) {
                    setOwned(true)
                    stockObj = { symbol: symbol };
                    amount += 1;
                    assetId = asset.asset_id;
                    stockId.push(asset.id)
                }
            });
            stockObj.amount = amount
            stockObj.assetId = assetId;
            stockObj.stockId = stockId;

            // console.log(stockObj)
            setAssetObj(stockObj)
        }
    }

    useEffect(() => {
        dispatch(restoreUser());
        dispatch(getAsset(sessionUser.id));
        dispatch(fetchLists(sessionUser.id));
        checkStockInAsset();
        // checkStockInAsset();
        // console.log(assetObj)

    }, [dispatch, addToList]);

    return (
        <>
            <div id="stock-sidebar">
                <div id="stock-sidebar-background">
                    <div id="order-tab">
                        <div id="buy-or-sell">
                            <h4 onClick={() => setBuying(true)}>Buy {symbol}</h4>
                            {owned && (
                                <h4 onClick={() => setBuying(false)}>Sell {symbol}</h4>
                            )}
                        </div>
                        <div className="order-type">
                            <h4>Order Type</h4>
                            <h4>Market Order</h4>
                        </div>
                        <br />
                        <div className="amount">
                            <h4>Shares</h4>
                            <input type='number' placeholder="0" required
                                // value={quantity}
                                onChange={(e) => {
                                    checkStockInAsset();
                                    if (e.target.value <= assetObj.amount) {
                                        setQuantity(e.target.value);
                                        setPrice(formatter.format(e.target.value * stockInfo.c));
                                    } else if (e.target.value < 0) {
                                        e.target.value = 0;
                                        setQuantity(0)
                                        setPrice(formatter.format(0));
                                    } else {
                                        e.target.value = assetObj.amount;
                                        setQuantity(e.target.value)
                                        setPrice(formatter.format(e.target.value * stockInfo.c));
                                    }
                                    if (e.target.value > 1) setShare('shares');
                                    else setShare('share');
                                }}></input>
                        </div>
                        <br />
                        <div className="amount market-price">
                            <h4>Market Price</h4>
                            <h4>{formatter.format(stockInfo.c)}</h4>
                        </div>

                        <div className="quantity">
                            <h4>Estimated Cost</h4>
                            <h4>{price}</h4>
                        </div>
                        <div id="review-order-div">
                            {!reviewOrder && (
                                <button id="review-order"
                                    onClick={() => setReviewOrder(true)}
                                >Review Order</button>
                            )}
                        </div>

                        {/* Purchase stocks */}
                        {reviewOrder && (
                            <div>
                                {buying && (
                                    <>
                                        <p>You're placing an order to buy {quantity} of {symbol} for ${price}</p>
                                        <button onClick={submitPurchase}>Buy</button>
                                    </>
                                )}
                                {!buying && (
                                    <>
                                        <p>You're placing an order to sell {quantity} of {symbol} for ${price}</p>
                                        <button onClick={submitSale}>Sell</button>
                                    </>
                                )}
                            </div>
                        )}
                        {owned && (
                            <div>
                                <p>{assetObj.amount} shares available</p>
                            </div>
                        )}
                    </div>
                </div>
                <div id="add-to-lists-div">
                    <button id='add-to-lists'
                        onClick={() => setAddToList(true)}>Add to Lists</button>
                </div>
            </div>


            {addToList && (
                <>
                    <div id="add-to-list-popup">
                        <div id="list-popup-top">
                            <h2>Add {symbol} to Your Lists</h2>
                            <button
                                className="exit-button"
                                onClick={() => setAddToList(false)}>X</button>
                        </div>
                        <br />
                        {lists && (
                            lists?.map(list => (
                                <div key={list.id}
                                    onClick={() => dispatch(addStockToList(list.id, symbol))}>
                                    {/* <img src="https://png.pngtree.com/png-vector/20201208/ourmid/pngtree-flat-light-bulb-shine-bright-isolated-vector-png-image_2531330.jpg" alt="lightbulb"/> */}
                                    <br />
                                    {inList && <input type="checkbox" checked />}
                                    {!inList && <input type="checkbox" />}
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
