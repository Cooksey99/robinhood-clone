import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBankFetch, deleteBankFetch, fetchBanks } from "../../store/banking";
import './banking.css';

export const Banking = () => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const banks = useSelector(state => state?.bankingReducer?.banks);

    const [addBank, setAddBank] = useState(false);
    const [account_number, set_account_number] = useState('');
    const [routing_number, set_routing_number] = useState('');
    const [nickname, set_nickname] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user_id = sessionUser.id;

        const bank = {
            user_id,
            account_number,
            routing_number,
            nickname
        }
        dispatch(addBankFetch(bank));
        dispatch(fetchBanks(sessionUser.id));
        setAddBank(false);
    };

    const handleUnlink = (bankId) => async (e) => {
        e.preventDefault();

        dispatch(deleteBankFetch(bankId));
        dispatch(fetchBanks(sessionUser.id));
    }

    useEffect(() => {
        dispatch(fetchBanks(sessionUser.id))
    }, [dispatch, addBank])

    return (
        <>
            <div className="main-info-container">
                <div>
                    <h1>Banking</h1>
                    <br />
                    <h2>Linked Accounts</h2>
                </div>
                <br />
                <hr />
                {addBank && (
                    <div id="add-bank-div">
                        <form onSubmit={handleSubmit} id='add-bank-form'>
                            <div className="top-align">
                                <label>Account Nickname</label>
                                <button onClick={() => setAddBank(false)}>X</button>
                            </div>
                            <input placeholder="Nickname" required
                                onChange={(e) => set_nickname(e.target.value)}></input>
                            <label>Routing Number</label>
                            <input placeholder="" type='number' required
                                onChange={(e) => set_routing_number(e.target.value)}></input>
                            <label>Account Number</label>
                            <input placeholder="" type='number' required
                                onChange={(e) => set_account_number(e.target.value)}></input>
                            <button type="submit">Link Account</button>
                        </form>
                    </div>
                )}
                {banks.length > 0 && (
                    banks.map(bank => (
                        <div id="linked-bank" key={bank.id}>
                            <h2>{bank.nickname}</h2>
                            <button onClick={handleUnlink(bank.id)}>Unlink</button>
                        </div>
                    ))
                )}
                <br />
                <br />
                <button
                    onClick={() => setAddBank(true)}
                >Add New Account</button>
            </div>
        </>
    )
}
