import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../store/watchlist";


export const StockSideBar = ({ symbol, stockInfo }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(0);
    const [addToList, setAddToList] = useState(false);
    const lists = useSelector(state => state?.listReducer?.lists)

    useEffect(() => {
        dispatch(fetchLists())
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
                        <input type='number'
                            placeholder="$0.00"
                            onChange={(e) => setQuantity(e.target.value * stockInfo.c)}></input>
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
                                <div key={list.id}>
                                    {/* <img src="https://png.pngtree.com/png-vector/20201208/ourmid/pngtree-flat-light-bulb-shine-bright-isolated-vector-png-image_2531330.jpg" alt="lightbulb"/> */}
                                    <br />
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
