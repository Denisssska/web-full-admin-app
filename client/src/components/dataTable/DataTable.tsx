import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import type { GridColDef } from '@mui/x-data-grid';

import './dataTable.scss';

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  
};

export const DataTable = (props: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
        method: 'delete',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`all${props.slug}`] });
    },
  });

  const handleDelete = (id: number) => {
    //delete the item
    mutation.mutate(id);
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: params => {
      // console.log(params);

      return (
        <div className="action">
          <div>
            <Link to={`/${props.slug}/${params.row.id}`}>
              <img src="/view.svg" alt="" />
            </Link>
          </div>

          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
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
