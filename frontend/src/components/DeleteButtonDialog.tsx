import React, { useState, Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthQuery } from "../api";
import { useSnackbar } from "../utils/Snackbar"

const query = new AuthQuery();


const DeleteButtonDialog = ({ rowId }:{ rowId: number }) => {
  const { showSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRow = (rowId:number) => {
    query.deleteInfo({ id: rowId }).then((response) => {
      if (response){
          showSnackbar('Success!', 'success')
      }else{
          showSnackbar('False!', 'error')
      }
    })
    window.location.reload()
    setOpen(false);
};

  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <IconButton aria-label="delete" onClick={handleOpen} color="primary">
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Attention'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure to delete ID "{rowId}" ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary" autoFocus>
              No
            </Button>
            <Button onClick={() => deleteRow(rowId)}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </div>
  );
};

export default DeleteButtonDialog;