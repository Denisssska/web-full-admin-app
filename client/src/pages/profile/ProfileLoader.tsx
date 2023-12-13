import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const Profile = lazy(() => import('./Profile.tsx'));
const ProfileLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Profile />
    </Suspense>
  );
};
export default ProfileLoader;
