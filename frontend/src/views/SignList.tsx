import React , { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { DataGrid } from '@mui/x-data-grid';
import { Link, Grid, Typography } from '@mui/material';
import { AuthQuery } from "../api";
import { DeleteButtonDialog } from '../components';

const query = new AuthQuery();



const SignList:React.FC = () => {
  const navigate = useNavigate();
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
    { field: 'password', headerName: 'Password', width: 200 },
  ];
  

  const moveToSignin = () => {
    navigate(`/signin`)
  };



  return (
    <div>
      <Typography component="h1" variant="h5" style={{ paddingLeft: 50, paddingTop: 50 }}>
        Account List for Developper
      </Typography>
      <div style={{ height: 400, width: '90%', padding:50 }}>
        <DataGrid rows={rowData} columns={columns} pageSize={5} />
      </div>
      <Grid item>
        <Link onClick={moveToSignin} variant="body2" style={{ paddingLeft: 50 }}>
            {"Sign in"}
        </Link>
      </Grid>
    </div>
  );
}

export default SignList;
