import './Users.scss';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { AddUser, DataTable, Modal } from '../../components';

import { useModal } from '../../components/hooks/useModal';

import type { GridColDef } from '@mui/x-data-grid';

export const usersColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'number', headerName: '№', type: 'text', width: 70 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 100,
    type: 'text',
    renderCell: params => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'firstName',
    type: 'text',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    type: 'text',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    type: 'text',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    type: 'text',
    headerName: 'Phone',
    width: 120,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 120,
    type: 'text',
  },
  {
    field: 'verified',
    headerName: 'Verified',
    width: 100,
    type: 'boolean',
  },
];

export const Users = () => {
  const { isOpen, onClose, onOpen } = useModal();

  const queryClient = useQueryClient();

  // TEST THE API
  const fetchUsers = async () => {
    const data = await fetch(`http://localhost:8800/api/users`).then(res => res.json());
    return data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ['allusers'],
    queryFn: fetchUsers,
  });

  const getUser = async (id: number) => {
    const user = await data.find((user: { id: number }) => user.id === id);
    // Кэшируем выбранного пользователя
    queryClient.setQueryData(['user'], user);
  };
  // console.log(queryClient.getQueryData(['user']))
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => onOpen()}>Add New User</button>
        <button onClick={() => onClose()}>Close modal</button>
      </div>

      {isLoading ? (
        'Loading...'
      ) : (
        <DataTable slug="users" columns={usersColumns} rows={data} callBack={id => getUser(id)} />
      )}
      {isOpen() && (
        <Modal title="Add new User" onClose={onClose}>
          <AddUser slug="user" onClose={onClose} itemLength={data.length} />
        </Modal>
      )}
    </div>
  );
};
