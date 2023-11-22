import './product.scss';

import { loadingSelector, useAppSelector } from '../../store';

export const Product = () => {
  const loading = useAppSelector(loadingSelector);
  return <div className="product">{loading ? 'Loading...' : 'empty'}</div>;
};
