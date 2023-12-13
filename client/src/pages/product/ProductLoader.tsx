import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const Product = lazy(() => import('./Product.tsx'));
const ProductLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Product />
    </Suspense>
  );
};
export default ProductLoader;
