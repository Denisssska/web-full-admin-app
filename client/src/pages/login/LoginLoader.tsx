import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const Login = lazy(() => import('./Login.tsx'));
const LoginLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Login />
    </Suspense>
  );
};
export default LoginLoader;
