import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBankFetch, deleteBankFetch, editBank, fetchBanks } from "../../store/banking";
import './banking.css';

export const Banking = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state?.session?.user);
    const banks = useSelector(state => state?.bankingReducer?.banks);
    const newBank = useSelector(state => state?.bankingReducer?.newBank);

    // const [editBankButton, setEditBankButton] = useState(false);
    const [addBank, setAddBank] = useState(false);
    const [account_number, set_account_number] = useState('');
    const [routing_number, set_routing_number] = useState('');
    const [nickname, set_nickname] = useState('');
    const [editForm, setEditForm] = useState(false);
    const [bankId, setBankId] = useState(null);
    const [bankName, setBankName] = useState(null);

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

    const handleEdit = async (e) => {
        e.preventDefault();
        // history.push('/portfolio')
        const user_id = sessionUser.id;

        const bank = {
            user_id,
            account_number,
            routing_number,
            nickname
        }
        // console.log('here is your id:   ', bankId)
        dispatch(editBank(bank, bankId));
        setEditForm(false);
        dispatch(fetchBanks(sessionUser.id));
        setBankName(nickname);

    };

    const handleUnlink = (bankId) => async (e) => {
        e.preventDefault();

        dispatch(deleteBankFetch(bankId));
        dispatch(fetchBanks(sessionUser.id));
        // setEditBankButton(true)
        setBankName(null)
        setAddBank(true)
    }

    useEffect(() => {
        dispatch(fetchBanks(sessionUser.id))
        if (banks.length > 0) setBankName(banks[0].nickname);
        console.log('testing nickname', bankName)
    }, [dispatch, addBank, bankName])

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
                                <button type='button' onClick={() => setAddBank(false)} >X</button>
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
                {editForm && (
                    <div id="add-bank-div">
                        <form onSubmit={handleEdit} id='add-bank-form'>
                            <div className="top-align">
                                <label>Account Nickname</label>
                                <button onClick={() => setEditForm(false)}>X</button>
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
                    // banks.map(bank => (
                        <div id="linked-bank" >

                            <h2>{banks[0].nickname}</h2>
                            <button onClick={handleUnlink(banks[0].id)} className='banking-edit-button'>Unlink</button>
                            <button className='banking-edit-button'
                                onClick={(e) => {
                                    setEditForm(true);
                                    setBankId(banks[0].id);
                                    setBankName(e.target.value)
                                }}>Edit</button>
                        </div>
                    // ))
                )}
                <br />
                <br />
                {!banks.length > 0 && (
                    <button
                        onClick={() => setAddBank(true)}
                        className='add-new-account-button'
                    >Add New Account</button>

                )}
            </div>
        </>
    )
}
