import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getAsset } from '../../store/asset';
import { createNewList, deleteList, editList, fetchLists } from '../../store/watchlist';

import './sidebar.css'
import { SidebarStock } from './SidebarStock'


export const Sidebar = ({ assets }) => {

    const location = useLocation();

    const [newList, setNewList] = useState(false);
    const [list, setList] = useState({});
    const [listName, setListName] = useState('');
    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const allLists = useSelector(state => state?.listReducer?.lists);
    // const assets = useSelector(state => state?.assetReducer?.assetsArray);
    const allTickers = useSelector(state => state?.assetReducer?.dataSet)
    // const allAssets = new Set(Object.entries(assetsObj));

    const [unique, setUnique] = useState([])
    // const [uniqueSet, setUniqueSet] = useState(new Set(unique));

    const user_id = sessionUser.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log('handling submit')
        let list_name = listName;
        dispatch(createNewList({ user_id, list_name }))
        dispatch(fetchLists(sessionUser.id))
    }

    const editForm = (list) => async (e) => {
        setEdit(true);
        setList(list);
        setListName(list.list_name);
        // console.log(list)
        dispatch(fetchLists(sessionUser.id))

    }

    const submitEdit = async (e) => {
        e.preventDefault();
        list.list_name = listName;
        console.log('list data:     ', list)
        dispatch(editList(list));
        setEdit(false);
        dispatch(fetchLists(sessionUser.id))
    }

    const submitDelete = (listId) => async (e) => {
        e.preventDefault();
        dispatch(deleteList(listId))
        dispatch(fetchLists(sessionUser.id));
    }

    useEffect(() => {

        dispatch(getAsset(sessionUser.id));
        dispatch(fetchLists(sessionUser.id));

        // let uniqueSet = new Set(unique);
        // console.log(uniqueSet)
        // console.log('==========', allTickers)
        console.log('12345678901234567890: ', assets)
    }, [dispatch, location])

    return (
        <>
            <div id="sidebar">
                {/* <h2 className='stock-header'>Stocks</h2> */}
                {/* {allTickers.length > 0 && allTickers.forEach(ticker => (
                        <SidebarStock ticker={ticker}/>
                    ))} */}
                {/* {assets.length > 0 && assets.forEach(stock => (
                    <div>
                        <SidebarStock ticker={stock} />
                    </div>
                ))} */}
                <div className='new-list'>
                    <h2 id='list-header'>Lists</h2>
                    <button id='add-list-button'
                        onClick={() => setNewList(true)}>+</button>
                </div>

                {/* watchlist function */}
                {newList && (
                    <form id='new-list-form' onSubmit={handleSubmit}>
                        <section>
                            <img src="https://image.similarpng.com/very-thumbnail/2020/10/Illustration-of-light-bulb-on-transparent-background-PNG.png" alt='list-icon' />
                            <input value={listName}
                                className='list-input' required
                                onChange={(e) => setListName(e.target.value)}
                                placeholder='List Name'></input>
                        </section>
                        <div className='list-options'>
                            <button type='button' className='cancel-list'
                                onClick={() => setNewList(false)}>Cancel</button>
                            <button type='submit' className='create-list'>Create List</button>
                        </div>
                    </form>
                )}
                {allLists.length > 0 && (
                    allLists.map(list => (
                        <Link key={list.id}
                            to={`/list/${list.id}`}
                            id='list-select'>
                            <h2>{list.list_name}</h2>
                            <button onClick={editForm(list)}>edit</button>
                            <button onClick={submitDelete(list.id)}>delete</button>
                        </Link>

                    ))
                )}
                {edit && (
                    <>
                        <div className='editList'>
                            <form onSubmit={submitEdit}>
                                <div className='top-bar-edit'>
                                    <h2>Edit List</h2>
                                    <button type='button' className='edit-exit-button'
                                        onClick={() => setEdit(false)}>X</button>
                                </div>
                                <input
                                    required
                                    value={listName}
                                    className='save-edit-button'
                                    onChange={(e) => setListName(e.target.value)}></input>
                                <button type='submit'>Save</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
