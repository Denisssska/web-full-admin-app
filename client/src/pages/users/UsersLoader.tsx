import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const Users = lazy(() => import('./Users.tsx'));
const UsersLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Users />
    </Suspense>
  );
};
export default UsersLoader;
