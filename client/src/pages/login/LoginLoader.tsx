import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';

const Login = lazy(() => import('./Login.tsx'));
const LoginLoader = () => {
  return (
    <Suspense fallback={<PreloaderForLazy />}>
      <Login />
    </Suspense>
  );
};
export default LoginLoader;
