import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';

import { ProductsSchemaType, ProfileSchemaType } from '../../utils';

import type { GridColDef } from '@mui/x-data-grid';

import './dataTable.scss';

type Props = {
  columns: GridColDef[];
  rows: ProfileSchemaType[] | ProductsSchemaType[];
  slug: string;
};

export const DataTable = (props: Props) => {
  const handleDelete = (id: number) => {
    console.log(id);
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 70,
    renderCell: params => {
      // console.log(params);

      return (
        <div className="action">
          <div>
            <Link to={`/${props.slug}/${params.row._id}`}>
              <img src="/view.svg" alt="" />
            </Link>
          </div>

          <div className="delete" onClick={() => handleDelete(params.row._id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        getRowId={row => row._id}
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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
};
