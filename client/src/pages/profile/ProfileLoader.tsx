import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';
const Profile = lazy(() => import('./Profile.tsx'));
const ProfileLoader = () => {
  return (
    <Suspense fallback={<PreloaderForLazy />}>
      <Profile />
    </Suspense>
  );
};
export default ProfileLoader;
