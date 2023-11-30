import { useEffect } from 'react';

import './products.scss';

import { CreateProduct, DataTable, Modal } from '../../components';

import { useModal } from '../../components/hooks/useModal';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { allProductsSelector, loadingSelector } from '../../store/selectors';

import { getAllProductsTC } from '../../store/slices';

import type { GridColDef } from '@mui/x-data-grid';

export const productColumns: GridColDef[] = [
  { field: 'number', headerName: '№', type: 'text', width: 50 },
  { field: '_id', headerName: 'ID', type: 'text', width: 220 },
  {
    field: 'img',
    headerName: 'Image',
    type: 'file',
    width: 70,
    renderCell: params => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'title',
    type: 'text',
    headerName: 'Title',
    width: 100,
  },
  {
    field: 'color',
    type: 'text',
    headerName: 'Color',
    width: 100,
  },
  {
    field: 'price',
    type: 'text',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'producer',
    headerName: 'Producer',
    type: 'text',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 120,
    type: 'text',
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 100,
    type: 'boolean',
  },
  {
    field: 'viewsCount',
    headerName: 'views',
    width: 20,
    type: 'number',
  },
];

export const Products = () => {
  const { isOpen, onClose, onOpen } = useModal();
  const actions = useActionCreators({ getAllProductsTC });
  let allProducts = useAppSelector(allProductsSelector);

  useEffect(() => {
    actions.getAllProductsTC();
    return () => console.clear();
  }, [allProducts.length, actions]);

  const loading = useAppSelector(loadingSelector);

  if (allProducts.length) {
    allProducts = allProducts.map((element, i) => ({
      ...element,
      createdAt: new Date(element.createdAt!).toLocaleDateString(),
      number: i + 1,
    }));
  }

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={onOpen}>Add New Products</button>
      </div>
      {loading ? 'Loading...' : <DataTable slug="products" columns={productColumns} rows={allProducts} />}
      {isOpen() && (
        <Modal onClose={onClose} title="Create Product">
          <CreateProduct onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};
