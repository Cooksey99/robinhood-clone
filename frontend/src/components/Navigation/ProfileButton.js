import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { formatter } from "../finnhubSetup";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {

    dispatch(sessionActions.restoreUser())
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button onClick={openMenu} className='nav-bar-button'>
        {/* <i className="fas fa-user-circle" /> */}
        Account
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <p>{user.first_name} {user.last_name}</p>
          <section>
            <div className="money-info">
              <p className="money-amount">sample</p>
              <p>Portfolio Value</p>
            </div>
            <div className="money-info">
              <p className="money-amount">{formatter.format(user.buyingPower)}</p>
              <p>Buying Power</p>
            </div>
          </section>
          <p>{user.username}</p>
          <Link to={`/account`}>Banking</Link>
          <p>
            <button onClick={logout}>Log Out</button>
          </p>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
