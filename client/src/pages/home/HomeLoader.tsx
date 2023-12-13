import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';
const Home = lazy(() => import('./Home.tsx'));
const HomeLoader = () => {
  return (
    <Suspense fallback={<PreloaderForLazy />}>
      <Home />
    </Suspense>
  );
};
export default HomeLoader;
