import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { Search } from './Search';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [hideNav, setHideNav] = useState(false);

  const url = useLocation();
  const path = url.pathname;

  useEffect(() => {
    console.log(path)
    if (path === '/login' || path === '/signup') setHideNav(true);
    else setHideNav(false);

  })

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      {!sessionUser && !hideNav && (
        <div id='nav'>
          <Link to='/'>Robinhood</Link>
          {sessionLinks}
        </div>
      )}

      {sessionUser && !hideNav && (
        <div id='nav'>
        <div className='divider'>
          <NavLink exact to="/portfolio">Home</NavLink>
        </div>
        <div className='divider'>
          <Search />
        </div>
        <div className='divider'></div>
        <div className='divider'>
          {isLoaded && sessionLinks}
        </div>
      </div>
      )}
    </>
  );
}

export default Navigation;
