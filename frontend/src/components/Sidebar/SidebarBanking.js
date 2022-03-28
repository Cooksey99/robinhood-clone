import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addBuyingPower } from "../../store/session";


export const SidebarBanking = () => {

    const dispatch = useDispatch();
    const banks = useSelector(state => state?.bankingReducer?.banks);
    const sessionUser = useSelector(state => state?.session?.user);

    const [reviewTransfer, setReviewTransfer] = useState(false);
    const [transferAmount, setTransferAmount] = useState(0);

    useEffect(() => {

    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = { ...sessionUser }
        const buyingPower = transferAmount;

        console.log(user);
        dispatch(addBuyingPower(user, buyingPower))
        // setReviewTransfer(false)
        // setTransferAmount(0)
    }

    return (
        <>
            <form id='bank-sidebar' onSubmit={handleSubmit}>
                <h2>Transfer money</h2>
                <section>
                    <div>
                        <label>Amount</label>
                        <input type="number" placeholder="$0.00" required
                            className="bank-amount-input"
                            onChange={(e) => setTransferAmount(e.target.value)} />
                    </div>
                    {/* <div>
                        <label>From</label>
                        <select>
                            {banks.length > 0 && banks?.map(bank => (
                                <option key={bank.id} value={bank.nickname}>{bank.nickname}</option>
                            ))}
                        </select>
                    </div> */}
                    {!reviewTransfer && (
                        <button type="button"
                            onClick={() => setReviewTransfer(true)}>Review Transfer</button>
                    )}
                </section>
                {reviewTransfer && (
                    <div className="review-button-section">
                        <button type="submit">Transfer</button>
                        <button type="button"
                            onClick={() => setReviewTransfer(false)}>Cancel</button>
                    </div>
                )}
            </form>
        </>
    )
}
