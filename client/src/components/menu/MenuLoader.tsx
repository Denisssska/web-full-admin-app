import { Suspense, lazy } from 'react';

import { Preloader } from '../index.ts';
const Menu = lazy(() => import('./Menu.tsx'));
const MenuLoader = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Menu />
    </Suspense>
  );
};
export default MenuLoader;
