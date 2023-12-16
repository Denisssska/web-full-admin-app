import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './styles/global.scss';

import { ErrorBoundary } from './components';

import Layout from './Layout';

import {
  HomeLoader,
  LoginLoader,
  Product,
  ProductLoader,
  Products,
  ProductsLoader,
  ProfileLoader,
  SignUpLoader,
  User,
  UserLoader,
  Users,
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
          path: '/products/id',
          element: <Product />,
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
