import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const SignUp = lazy(() => import('./SignUp.tsx'));
const SignUpLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <SignUp />
    </Suspense>
  );
};
export default SignUpLoader;
