import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const User = lazy(() => import('./User.tsx'));
const UserLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <User />
    </Suspense>
  );
};
export default UserLoader;
