import { Suspense, lazy } from 'react';

import { Preloader } from '../../components/index.ts';
const Products = lazy(() => import('./Products.tsx'));
const ProductsLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Products />
    </Suspense>
  );
};
export default ProductsLoader;
