import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './styles/global.scss';

import { ErrorBoundary } from './components';

import Layout from './Layout';

import {
  HomeLoader,
  LoginLoader,
  ProductLoader,
  ProductsLoader,
  ProfileLoader,
  SignUpLoader,
  UserLoader,
  UsersLoader,
} from './pages';

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
          element: <HomeLoader />,
        },
        {
          path: '/profile',
          element: <ProfileLoader />,
        },
        {
          path: '/users',
          element: <UsersLoader />,
        },
        {
          path: '/products',
          element: <ProductsLoader />,
        },
        {
          path: '/users/:id',
          element: <UserLoader />,
        },
        {
          path: '/products/:id',
          element: <ProductLoader />,
        },
      ],
    },
    {
      path: '/login',
      element: (
        <>
          <LoginLoader />
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <SignUpLoader />
          <ToasterProvider />
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
