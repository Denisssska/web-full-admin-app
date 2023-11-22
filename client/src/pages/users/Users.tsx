import './users.scss';

import { useEffect } from 'react';

import { DataTable } from '../../components';

import { allUsersSelector, loadingSelector, useActionCreators, useAppSelector } from '../../store';

import { getAllUsersTC } from '../../store/slices/userReducer';

import type { GridColDef } from '@mui/x-data-grid';

export const usersColumns: GridColDef[] = [
  { field: '_id', headerName: 'ID', type: 'text', width: 220 },
  { field: 'number', headerName: '№', type: 'text', width: 50 },
  {
    field: 'profilePhoto',
    headerName: 'Avatar',
    width: 70,
    type: 'text',
    renderCell: params => {
      return <img src={params.row.profilePhoto || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'firstname',
    type: 'text',
    headerName: 'First name',
    width: 120,
  },
  {
    field: 'lastname',
    type: 'text',
    headerName: 'Last name',
    width: 120,
  },
  {
    field: 'email',
    type: 'text',
    headerName: 'Email',
    width: 130,
  },
  {
    field: 'phone',
    type: 'text',
    headerName: 'Phone',
    width: 130,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 120,
    type: 'text',
  },
];
export const mobileColumns: GridColDef[] = [
  // { field: '_id', headerName: 'ID', type: 'string', width: 130 },
  { field: 'number', headerName: '№', type: 'text', width: 10 },
  {
    field: 'profilePhoto',
    headerName: 'Avatar',
    width: 30,
    type: 'text',
    renderCell: params => {
      return <img src={params.row.profilePhoto || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'firstname',
    type: 'text',
    headerName: 'First name',
    width: 30,
  },
];
export const Users = () => {
  const loading = useAppSelector(loadingSelector);
  const actions = useActionCreators({ getAllUsersTC });
  useEffect(() => {
    actions.getAllUsersTC();
    console.log('сработал запрос');

  }, [actions]);

  const allUsers = useAppSelector(allUsersSelector);
  let correctedUsers;
  if (allUsers !== null) {
    correctedUsers = allUsers.map((element, i) => ({
      ...element,
      createdAt: new Date(element.createdAt).toLocaleDateString(),
      number: i + 1,
    }));
  }
console.log(actions, allUsers, correctedUsers);

  const useMobileColumns = window.innerWidth <= 768;

  const columns = useMobileColumns ? mobileColumns : usersColumns;
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>

      {loading
        ? 'Loading...'
        : correctedUsers !== undefined && <DataTable slug="users" columns={columns} rows={correctedUsers} />}
    </div>
  );
};
