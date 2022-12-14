import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthQuery } from "../api";
import { DeleteButtonDialog, Sidebar } from '../components';

const query = new AuthQuery();

const theme = createTheme();

const SignList:React.FC = () => {
  const rowData = query.useGetAllInfo() ?? []
  

  const columns = [
    {
      field: 'deleteBtn',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params:any) => <DeleteButtonDialog rowId={ params.id } />
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email Address', width: 200 },
    { field: 'twitter', headerName: 'Twitter Account', width: 200 },
    { field: 'password', headerName: 'Password', width: 200 },
  ];
  



  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: '100%' }}>
          <Sidebar >
          <Typography component="h1" variant="h5" style={{ paddingLeft: 50, paddingTop: 50 }}>
            Account List for Developper
          </Typography>
          <div style={{ height: 400, width: '90%', padding:50 }}>
            <DataGrid rows={rowData} columns={columns} pageSize={5} />
          </div>
          </Sidebar>
      </Stack>
    </ThemeProvider>
  );
}

export default SignList;
