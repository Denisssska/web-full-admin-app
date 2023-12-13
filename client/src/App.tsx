import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './styles/global.scss';

import { ErrorBoundary } from './components';

import Layout from './Layout';

import { Login, Product, Products, Profile, SignUp, User, Users } from './pages';

import HomeLoader from './pages/home/HomeLoader';

import PrivateRoute from './privateRoute/PrivateRoute';

import { ToasterProvider } from './providers/ToasterProvider';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      errorElement: <ErrorBoundary />,

      children: [
        {
          path: '/',
          // element: <Home />,
          element: <HomeLoader />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
      ],
    },
    {
      path: '/login',
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <SignUp />
          <ToasterProvider />
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
