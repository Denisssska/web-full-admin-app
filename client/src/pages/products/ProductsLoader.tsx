import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';

// const Products = lazy(() => import('./Products.tsx'));
const ProductsLoader = () => {
  return (<></>
    // <Suspense fallback={<PreloaderForLazy />}>
    //   <Products />
    // </Suspense>
  );
};
export default ProductsLoader;
