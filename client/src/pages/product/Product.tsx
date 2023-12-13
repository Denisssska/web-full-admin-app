import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Single } from '../../components/single/Single';

import { singleUserAndProductInfo } from '../../data';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { currentProductSelector, loadingSelector } from '../../store/selectors';

import './product.scss';

import { getProductTC } from '../../store/slices';


const Product = () => {
  const { id } = useParams();
  const actions = useActionCreators({ getProductTC });
  const currentProduct = useAppSelector(currentProductSelector);

  useEffect(() => {
    if (
      !Object.keys(currentProduct).length ||
      (Object.keys(currentProduct).length && id !== currentProduct._id)
    ) {
      id && actions.getProductTC(id);
    }
    return () => console.clear();
  }, [id]);
  const loading = useAppSelector(loadingSelector);
  const res = {
    ...singleUserAndProductInfo,
    ...currentProduct,
  };
  return <div className="product">{loading ? 'Loading...' : <Single slug="product" {...res} />}</div>;
};
export default Product;
