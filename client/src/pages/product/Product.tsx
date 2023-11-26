import { useAppSelector } from '../../store/hooks/hooks';

import { loadingSelector } from '../../store/selectors';

import './product.scss';



export const Product = () => {
  const loading = useAppSelector(loadingSelector);
  return <div className="product">{loading ? 'Loading...' : 'empty'}</div>;
};
