import { Link } from 'react-router-dom';

import './navbar.scss';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { profileSelector } from '../../store/selectors';

import { logoutTC } from '../../store/slices';





export const Navbar = () => {
  const user = useAppSelector(profileSelector);
  const actions = useActionCreators({ logoutTC });

  const logoutHandler = async () => await actions.logoutTC();

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
          <img onClick={logoutHandler} className="logout" src="/logout.svg" alt="logout" />
      </div>
    </div>
  );
};
