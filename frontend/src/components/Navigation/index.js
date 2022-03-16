import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { Search } from './Search';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
      <div id='nav'>
        <div className='divider'>
          <NavLink exact to="/">Home</NavLink>
        </div>
        <div className='divider'>
          <Search />
        </div>
        <div className='divider'></div>
        <div className='divider'>
          {sessionLinks}
        </div>
      </div>
    </>
  );
}

export default Navigation;
