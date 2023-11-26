import './users.scss';

import { useEffect } from 'react';

import { DataTable } from '../../components';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { allUsersSelector, loadingSelector } from '../../store/selectors';

import { getAllUsersTC } from '../../store/slices';

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
  const actions = useActionCreators({ getAllUsersTC });
  let allUsers = useAppSelector(allUsersSelector);
  useEffect(() => {
    // if (!allUsers.length) {
    actions.getAllUsersTC();
    // }
    return () => console.clear();
  }, []);

  const loading = useAppSelector(loadingSelector);

  if (allUsers.length) {
    allUsers = allUsers.map((element, i) => ({
      ...element,
      createdAt: new Date(element.createdAt).toLocaleDateString(),
      number: i + 1,
    }));
  }
  console.log(allUsers);

  const useMobileColumns = window.innerWidth <= 768;

  const columns = useMobileColumns ? mobileColumns : usersColumns;
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>

      {loading ? 'Loading...' : <DataTable slug="users" columns={columns} rows={allUsers} />}
    </div>
  );
};
