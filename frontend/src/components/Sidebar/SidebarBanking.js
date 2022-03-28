import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBanks } from "../../store/banking";
import { addBuyingPower } from "../../store/session";
import { formatter } from "../finnhubSetup";


export const SidebarBanking = () => {

    const dispatch = useDispatch();
    const banks = useSelector(state => state?.bankingReducer?.banks);
    const sessionUser = useSelector(state => state?.session?.user);

    const [reviewTransfer, setReviewTransfer] = useState(false);
    const [transferAmount, setTransferAmount] = useState(0);

    const [error, setError] = useState('');

    useEffect(() => {

    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (transferAmount !== 0) {
            let user = { ...sessionUser }
            const buyingPower = transferAmount;

            console.log(user);
            dispatch(addBuyingPower(user, buyingPower))
            dispatch(fetchBanks(user.id))
            // setReviewTransfer(false)
            // setTransferAmount(0)
        } else {
            if (banks.lengh <= 0) setError('You must add a bank to transfer funds.')
            else if (transferAmount <= 0) setError('You must select an amount to transfer.');
        }
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
                            onChange={(e) => {
                                if (e.target.value < 0) {
                                    e.target.value = 0;
                                    setTransferAmount(e.target.value)
                                } else if (e.target.value > 200000) {
                                    e.target.value = 200000;
                                    setTransferAmount(e.target.value)
                                }
                            }} />
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
                {error && (
                    <div>
                        <p>{error}</p>
                    </div>
                )}
            </form>
        </>
    )
}
