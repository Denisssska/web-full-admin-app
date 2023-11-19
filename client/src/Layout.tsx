import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Outlet } from 'react-router-dom';

import { Footer, Menu, Navbar, Preloader } from './components';

import { ToasterProvider } from './providers/ToasterProvider';
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <div style={{position:'relative'}}  className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
      <Footer />
      <ToasterProvider />
      <Preloader />
    </div>
  );
};
export default Layout;
