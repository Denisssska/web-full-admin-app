import { Suspense, lazy } from 'react';

import { PreloaderForLazy } from '../../components/preloader/PreloaderForLazy.tsx';

const Product = lazy(() => import('./Product.tsx'));
const ProductLoader = () => {
  return (
    <Suspense fallback={<PreloaderForLazy />}>
      <Product />
    </Suspense>
  );
};
export default ProductLoader;
