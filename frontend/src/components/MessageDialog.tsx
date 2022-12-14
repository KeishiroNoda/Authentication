import * as React from 'react';
import { Button, DialogTitle, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Typography from '@mui/material/Typography';


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  text1: string;
  text2: string;
  onClose: (value: string) => void;
}


const MessageDialog = (props: SimpleDialogProps) => {
  const { open, selectedValue, text1, text2, onClose } = props;


  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Onetime Password"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text1}
          </DialogContentText>
          <br/>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6" align="center">
              {selectedValue}
            </Typography>
          </DialogContentText>
          <br/>
          <DialogContentText id="alert-dialog-description">
            {text2}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MessageDialog;
