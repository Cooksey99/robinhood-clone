import { useState } from 'react'
import { useSelector } from 'react-redux';
import './sidebar.css'
import { SidebarStock } from './SidebarStock'


export const Sidebar = () => {

    const [newList, setNewList] = useState(false);
    const [list_name, setList_name] = useState('');

    const sessionUser = useSelector(state => state.session.user);
    const handleSubmit = async(e) => {
        e.preventDefault();

        const user_id = sessionUser.id

        const watchlistData = {
            user_id,
            list_name
        }
    }

    return (
        <>
            <div id="sidebar">
                <h2>Stocks</h2>
                <SidebarStock />
                <div className='new-list'>
                    <h2>Lists</h2>
                    <button onClick={() => setNewList(true)}>+</button>
                </div>
                {newList && (
                    <form onSubmit={handleSubmit}>
                    <input value={list_name}
                    required
                    onChange={(e) => setList_name(e.target.value)}
                    placeholder='List Name'></input>
                    <button onClick={() => setNewList(false)}>Cancel</button>
                    <button>Create List</button>
                </form>
                )}
            </div>
        </>
    )
}
