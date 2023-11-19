import { useQuery } from '@tanstack/react-query';

import { AddProduct, DataTable, Modal } from '../../components';

import { useModal } from '../../components/hooks/useModal';

import type { GridColDef } from '@mui/x-data-grid';

export const productColumns: GridColDef[] = [
  { field: 'number', headerName: '№', type: 'text', width: 70 },
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  {
    field: 'img',
    headerName: 'Image',
    type: 'text',
    width: 100,
    renderCell: params => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'title',
    type: 'text',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'color',
    type: 'text',
    headerName: 'Color',
    width: 90,
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
    width: 120,
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
];

export const Products = () => {
  const { isOpen, onClose, onOpen } = useModal();
  const fetchProducts = async () => {
    const data = await fetch(`http://localhost:8800/api/products`).then(res => res.json());
    return data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ['allproducts'],
    queryFn: fetchProducts,
  });
  console.log('allproducts', data);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => onOpen()}>Add New Products</button>
      </div>
      {isLoading ? 'Loading...' : <DataTable slug="products" columns={productColumns} rows={data} />}
      {isOpen() && (
        <Modal onClose={onClose} title="Add New Product">
          <AddProduct slug="product" onClose={onClose} itemLength={data.length} />
        </Modal>
      )}
    </div>
  );
};
