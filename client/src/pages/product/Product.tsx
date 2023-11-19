import { useQuery } from '@tanstack/react-query';

import { useLocation } from 'react-router-dom';

import { Single } from '../../components';

import { singleProduct } from '../../data';

import './product.scss';

export const Product = () => {
  //Fetch data and send to Single Component
  const location = useLocation();
  const id = location.pathname.slice(10);
  //Fetch data and send to Single Component
  const { isLoading, data } = useQuery({
    queryKey: ['product'],
    queryFn: () => fetch(`http://localhost:8800/api/products/${id}`).then(res => res.json()),
  });
  console.log(data);
  const props = {
    ...singleProduct,
    number: data?.number,
    id: data?.id,
    title: data?.title,
    img: data?.img,
    createdAt: data?.createdAt,
    info: {
      ...singleProduct.info,
      color: data?.color,
      price: data?.price,
      producer: data?.producer,
    },
  };
  return <div className="product">{isLoading ? 'Loading...' : <Single slug="product" {...props} />}</div>;
};
