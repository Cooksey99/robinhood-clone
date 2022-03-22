import { useState } from "react"


export const StockSideBar = ({ symbol, stockInfo }) => {

    const [quantity, setQuantity] = useState(0);
    const [addToList, setAddToList] = useState(false);

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
            
        </>
    )
}
