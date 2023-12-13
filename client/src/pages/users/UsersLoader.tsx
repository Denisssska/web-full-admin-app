import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';
const Users = lazy(() => import('./Users.tsx'));
const UsersLoader = () => {
  return (
    <Suspense fallback={<PreloaderForLazy />}>
      <Users />
    </Suspense>
  );
};
export default UsersLoader;
