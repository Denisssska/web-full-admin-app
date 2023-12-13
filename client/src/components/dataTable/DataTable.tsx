import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import React, { FC, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';

import { ProductsSchemaType, ProfileSchemaType } from '../../utils';

import type { GridColDef } from '@mui/x-data-grid';

import './dataTable.scss';

type Props = {
  columns: GridColDef[];
  rows: ProfileSchemaType[] | ProductsSchemaType[];
  slug: string;
};

export const DataTable: FC<Props> = React.memo(({ columns, rows, slug }) => {
console.log('render data');

  const handleDelete = useCallback((id: number) => {
    // Логика удаления
  }, []);

  const actionColumn: GridColDef = useMemo(
    () => ({
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: params => {
        return (
          <div className="action">
            <div>
              <Link to={`/${slug}/${params.row._id}`}>
                <img src="/view.svg" alt="" />
              </Link>
            </div>

            <div className="delete" onClick={() => handleDelete(params.row._id)}>
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    }),
    [handleDelete, slug]
  );

  return (
    <div className="dataTable">
      <DataGrid
        getRowId={row => row._id}
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize:5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
});
DataTable.displayName='DataTable';
