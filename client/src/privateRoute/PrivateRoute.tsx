import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { profileSelector } from '../store';

import { useAppSelector } from '../store/hooks/hooks';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(profileSelector);

  return user !== null ? <>{children}</> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
