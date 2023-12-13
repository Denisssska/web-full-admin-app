import { Suspense, lazy } from 'react';

import { Preloader } from '../../components';
const AsyncHome = lazy(() => import('./AsyncHome.tsx'));
const HomeLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <AsyncHome />
    </Suspense>
  );
};
export default HomeLoader;
