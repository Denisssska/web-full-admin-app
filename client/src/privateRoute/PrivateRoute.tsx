import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks/hooks';

import { profileSelector } from '../store/selectors';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(profileSelector);

  return user !== null ? <>{children}</> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
