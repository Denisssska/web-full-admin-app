import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';

// const User = lazy(() => import('./User.tsx'));
const UserLoader = () => {
  return (<></>
    // <Suspense fallback={<PreloaderForLazy />}>
    //   <User />
    // </Suspense>
  );
};
export default UserLoader;
