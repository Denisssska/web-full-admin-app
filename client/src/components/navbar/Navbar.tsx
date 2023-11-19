import { Link } from 'react-router-dom';

import './navbar.scss';

import { profileSelector, useActionCreators, useAppSelector } from '../../store';

import { userActions } from '../../store/slices/userReducer';

export const Navbar = () => {
  const user = useAppSelector(profileSelector);
  const actions = useActionCreators({ ...userActions });

  const logoutHandler = () => {
    localStorage.removeItem('persist:root');
    actions.logout();
  };
  return (
    <div className="navbar">
      <Link to={'/'}>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
          <span>MY DASH</span>
        </div>
      </Link>
      <div className="icons">
        {/* <img src="/search.svg" alt="search" className="icon" /> */}
        {/* <img src="/app.svg" alt="app" className="icon" /> */}
        {/* <img src="/expand.svg" alt="expand" className="icon" /> */}
        <div className="notification">
          <img src="/notifications.svg" alt="notifications" className="icon" />
          <span>1</span>
        </div>
        <Link to={'/profile'}>
          <div className="user">
            <img src={user.profilePhoto} alt="user" className="icon" />
            <span>{user.username}</span>
          </div>
        </Link>
        <Link onClick={logoutHandler} to={'/login'} replace>
          <img className="logout" src="/logout.svg" alt="logout" />
        </Link>
      </div>
    </div>
  );
};
