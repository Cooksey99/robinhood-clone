import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"


export const SidebarBanking = () => {

    const dispatch = useDispatch();
    const banks = useSelector(state => state?.bankingReducer?.banks);

    const [reviewTransfer, setReviewTransfer] = useState(false);

    useEffect(() => {

    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        
    }

    return (
        <>
            <form id='bank-sidebar' onSubmit={handleSubmit}>
                <h2>Transfer money</h2>
                <section>
                    <div>
                        <label>Amount</label>
                        <input type="number" placeholder="$0.00" />
                    </div>
                    <div>
                        <label>From</label>
                        <select>
                            {banks.length > 0 && banks?.map(bank => (
                                <option key={bank.id} value={bank.nickname}>{bank.nickname}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={() => setReviewTransfer(true)}>Review Transfer</button>
                </section>
                {reviewTransfer && (
                    <div>
                        <button>Transfer</button>
                        <button type='button'
                            onClick={() => setReviewTransfer(false)}>Cancel</button>
                    </div>
                )}
            </form>
        </>
    )
}
