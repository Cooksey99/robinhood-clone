import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewList, editList, fetchLists } from '../../store/watchlist';

import './sidebar.css'
import { SidebarStock } from './SidebarStock'


export const Sidebar = () => {

    const [newList, setNewList] = useState(false);
    const [list, setList] = useState({});
    const [listName, setListName] = useState('');
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const allLists = useSelector(state => state?.listReducer?.lists)
    const user_id = sessionUser.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log('handling submit')
        dispatch(createNewList({ user_id, listName }))
    }

    const editForm = (list) => async (e) => {
        setEdit(true);
        setList(list)
        setListName(list.list_name)
        // console.log(list)

    }

    const submitEdit = async (e) => {
        e.preventDefault();

        dispatch(editList(list));
    }

    useEffect(() => {
        dispatch(fetchLists());
    }, [])

    return (
        <>
            <div id="sidebar">
                <h2>Stocks</h2>
                <SidebarStock />
                <div className='new-list'>
                    <h2>Lists</h2>
                    <button onClick={() => setNewList(true)}>+</button>
                </div>

                {/* watchlist function */}
                {newList && (
                    <form onSubmit={handleSubmit}>
                        <input value={listName}
                            required
                            onChange={(e) => setListName(e.target.value)}
                            placeholder='List Name'></input>
                        <button type='button' onClick={() => setNewList(false)}>Cancel</button>
                        <button type='submit'>Create List</button>
                    </form>
                )}
                {allLists && (
                    allLists.map(list => (
                        <>
                            <h2>{list.list_name}</h2>
                            <button onClick={editForm(list)}>edit</button>
                        </>
                    ))
                )}
                {edit && (
                    <>
                        <div className='editList'>
                            <form onSubmit={submitEdit}>
                                <h2>Edit List</h2>
                                <input
                                required
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}></input>
                                <button type='submit'>Save</button>
                                <button type='button'
                                onClick={() => setEdit(false)}>X</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
