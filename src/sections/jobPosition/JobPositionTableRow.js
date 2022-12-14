import PropTypes from 'prop-types';
import { useState } from 'react';

import axios from 'axios';

// @mui
import { Grid,TextField,  TableRow, TableCell, Typography, MenuItem,Button,Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
import { api } from "../../constants";



// ----------------------------------------------------------------------

JobPositionTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onEditRowError: PropTypes.func,
};


export default function JobPositionTableRow({ row, selected, onEditRow,  onDeleteRow, onEditRowError }) {

  // const { id, name } = row;
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [names, setName] = useState(row.name);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleCloseDialogEdit = () => {
    
    setOpenDialogEdit(false);
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };
 
  const onSubmit = () => {
    
    
      axios({
        url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_JOBPOSITION}/${row.id}`,
        method: 'put',       
        headers: {
          //  "Content-Type": "multipart/form-data" 
           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
        data: {
          id: row.id,
          name: names,
        }
      }).then((response) => {
        if (response?.status === 200) {
          setName('');
        handleCloseDialogEdit()
        onEditRow();
        }
      }).catch(error => {
        console.log(error);
        setName('');
        setOpenDialogEdit(false);
        onEditRowError();
      });


  };
  return (

<TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {row.No}
        </Typography>
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>

    

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  setOpenDialogEdit(true);
                  
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                S???a th??ng tin
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenDialogDelete(true)
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xo??
              </MenuItem>
             
              
            </>
          }
        />
      </TableCell>
      <Dialog
    open={openDialogEdit}
    onClose={handleCloseDialogEdit}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth
    maxWidth="xs"
    >
    <DialogTitle id="alert-dialog-title">
      S???a v??? tr?? c??ng vi???c
    </DialogTitle>
    <DialogContent>
      <Grid container spacing={52}>
      
         <Grid item xs={12}>
         <TextField
  id="outlined-name"
  label="V??? tr?? c??ng vi???c"
  value={names}
  onChange={handleChange}
  fullWidth
            variant="standard"
/>
        </Grid>
        
      </Grid>
    </DialogContent>
    <DialogActions>
    
          <Button variant="contained" color="inherit" onClick={handleCloseDialogEdit}>Hu???</Button>
          <Button variant="contained" color="primary" onClick={onSubmit} >L??u</Button>
    </DialogActions>
    </Dialog>

    <Dialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          B???n c?? ch???c ch???n mu???n xo?? ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete} color="inherit"  variant='outlined'>Hu???</Button>
          <Button onClick={() => {
            onDeleteRow();
            handleCloseDialogDelete()
          }} variant='contained' color="primary" >Xo??</Button>
        </DialogActions>
      </Dialog>

    </TableRow>





  );
  
}
