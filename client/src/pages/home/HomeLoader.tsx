import { Suspense, lazy } from 'react';

import { Preloader } from '../../components';
const Home = lazy(() => import('./Home.tsx'));
const HomeLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Home />
    </Suspense>
  );
};
export default HomeLoader;
