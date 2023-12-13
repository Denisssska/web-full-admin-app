import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Footer, MenuLoader, Navbar, Preloader } from './components';

import { ToasterProvider } from './providers/ToasterProvider';

const Layout = () => {
  return (
    <div style={{ position: 'relative' }} className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Suspense fallback={<Preloader />}>
            <MenuLoader />
          </Suspense>
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
