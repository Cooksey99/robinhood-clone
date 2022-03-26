import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAsset } from "../../store/asset";
import { restoreUser } from "../../store/session";
import { addStockToList, purchaseStock, sellStock } from "../../store/stock";
import { fetchLists } from "../../store/watchlist";


export const StockSideBar = ({ symbol, stockInfo }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
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
                <div id="order-tab">
                    <div id="buy-or-sell">
                        <h3 onClick={() => setBuying(true)}>Buy {symbol}</h3>
                        {owned && (
                            <h3 onClick={() => setBuying(false)}>Sell {symbol}</h3>
                        )}
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="order-type">
                        <h3>Order Type</h3>
                        <h3>Market Order</h3>
                    </div>
                    <br />
                    <div className="amount">
                        <h3>Shares</h3>
                        <input type='number' placeholder="0" required
                            // value={quantity}
                            onChange={(e) => {
                                setPrice(e.target.value * stockInfo.c);
                                setQuantity(e.target.value);
                                if (e.target.value > 1) setShare('shares');
                                else setShare('share');
                            }}></input>
                    </div>
                    <br />
                    <div className="amount">
                        <h3>Market Price</h3>
                        <h3>${stockInfo.c}</h3>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="quantity">
                        <h3>Est. Cost</h3>
                        <h3>${price}</h3>
                    </div>
                    {!reviewOrder && (
                        <button id="review-order"
                            onClick={() => setReviewOrder(true)}
                        >Review Order</button>
                    )}

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
                <button id='add-to-lists'
                    onClick={() => setAddToList(true)}>Add to Lists</button>
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
                                    <h3>{list.list_name}</h3>
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
