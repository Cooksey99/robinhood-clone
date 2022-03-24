import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "../../store/session";
import { addStockToList } from "../../store/stock";
import { fetchLists } from "../../store/watchlist";


export const StockSideBar = ({ symbol, stockInfo }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [addToList, setAddToList] = useState(false);
    const [inList, setInList] = useState(false);
    const [reviewOrder, setReviewOrder] = useState(false);
    const [share, setShare] = useState('share');

    const lists = useSelector(state => state?.listReducer?.lists);
    const sessionUser = useSelector(state => state?.session?.user);

    const submitPurchase = async (e) => {
        e.preventDefault();

        const stock = {
            asset_id: sessionUser.id,
            ticker: symbol
        }
        
    }

    useEffect(() => {
        dispatch(restoreUser())
        dispatch(fetchLists(sessionUser.id))

    }, [dispatch, addToList])

    return (
        <>
            <div id="stock-sidebar">
                <div id="order-tab">
                    <h2>Buy {symbol}</h2>
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
                        <h3>{stockInfo.c}</h3>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="quantity">
                        <h3>Est. Quantity</h3>
                        <h3>${quantity}</h3>
                    </div>
                    {!reviewOrder && (
                        <button id="review-order"
                            onClick={() => setReviewOrder(true)}
                        >Review Order</button>
                    )}

                    {/* Purchase stocks */}
                    {reviewOrder && (
                        <div>
                            <p>You're placing an order to buy {quantity} of {symbol} for ${price}</p>
                            <button onClick={() => submitPurchase}>Buy</button>
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
