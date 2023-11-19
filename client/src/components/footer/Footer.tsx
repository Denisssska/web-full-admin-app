import { Link } from 'react-router-dom';

import './footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <Link to={'/'}>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
          <span>MY DASH</span>
          <span>All Rights Reserved &copy;</span>
        </div>
      </Link>
    </div>
  );
};
