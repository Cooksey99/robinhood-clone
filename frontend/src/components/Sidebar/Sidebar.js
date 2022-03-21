import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewList, fetchLists } from '../../store/watchlist';

import './sidebar.css'
import { SidebarStock } from './SidebarStock'


export const Sidebar = () => {

    const [newList, setNewList] = useState(false);
    const [list_name, setList_name] = useState('');
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const allLists = useSelector(state => state.listReducer.lists)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user_id = sessionUser.id
        console.log('handling submit')
        dispatch(createNewList({ user_id, list_name }))
    }

    const editList = () => {
        
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
                        <input value={list_name}
                            required
                            onChange={(e) => setList_name(e.target.value)}
                            placeholder='List Name'></input>
                        <button type='button' onClick={() => setNewList(false)}>Cancel</button>
                        <button type='submit'>Create List</button>
                    </form>
                )}
                {allLists && (
                    allLists.map(list => (
                        <>
                            <h2>{list.list_name}</h2>
                            <button onClick={editList}>edit</button>
                        </>
                    ))
                )}
            </div>
        </>
    )
}
