import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';

const SignUp = lazy(() => import('./SignUp.tsx'));
const SignUpLoader = () => {
  return (
    <Suspense fallback={<PreloaderForLazy />}>
      <SignUp />
    </Suspense>
  );
};
export default SignUpLoader;
