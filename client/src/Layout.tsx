import { Outlet } from 'react-router-dom';

import { Footer, Menu, Navbar, Preloader } from './components';

import { ToasterProvider } from './providers/ToasterProvider';

const Layout = () => {
  return (
    <div style={{ position: 'relative' }} className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToasterProvider />
      <Preloader />
    </div>
  );
};
export default Layout;
