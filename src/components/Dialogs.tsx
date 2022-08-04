import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select,{SelectChangeEvent }from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';

import {useSelector,useDispatch} from 'react-redux';
import {close} from '../states/filterDialog';

const theme = createTheme({
  palette:{
    primary:{
      main: Colors.yellow[800],
    }
  }
});

interface DateInput {
  value: string
  text: string
}
interface Active {
  state: boolean
}

function FilterDialog(props: Active){
  //@ts-ignore Object is of type 'unknown'
  const state = useSelector((state) => state.filterDialog.value);
  const dispatch = useDispatch();
  let date : DateInput = {value:'today',text:'Today'}
  const [showDialog,setShowDialog] = React.useState('block');
  const [dateValue,setDateValue] = React.useState({value:'today',text:'Today'});
  const handleDateChange = (event: SelectChangeEvent<typeof date.value>) => {
    setDateValue(
      // @ts-expect-error autofill of arbitrary value is not handled
      {value:event.target.value}
    );
  };

  const closeDialog = () => {
    let d = document.getElementById('myDialog');
    
    
  }
  return (
    <Dialog
      id='myDialog'
      open={state}
      sx={{borderRadius:'0px',display:showDialog}}
    >
    
    <DialogTitle sx={{fontSize:'11pt',display:'flex',justifyContent:'space-between'}}>
    <IconButton>
    <i className='fal fa-sliders-h' />
    </IconButton>
    <Typography sx={{m:2}}>
      Specifications to your search
    </Typography>
    </DialogTitle>
    <ThemeProvider theme={theme} >
    <DialogContent>
    <List>
      <ListItem sx={{display:'flex',justifyContent:'space-between'}}>
      <Switch /> Male <Switch />  Female
      </ListItem>
      <ListItem>
      <FormControl sx={{ mt: 2, minWidth: 120,width:'100%'}}>
              
      
       <Select
                
                value={'All'}
                variant='standard'
                label="Category"
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
                sx={{width:'100%',border:'none', height:'40px',my:2,color:'#000'}}
              >
              <MenuItem value={'all' as any}>All </MenuItem>
                <MenuItem value=
                'technology'>Technology</MenuItem>
                <MenuItem value="clothes">Clothing</MenuItem>
                <MenuItem value='food' >Household</MenuItem>
                
              </Select>
              
              <Select
                variant='standard'
                value={dateValue.value}
                
                label="time-posted"
                inputProps={{
                  name: 'time-posted',
                  id: 'time-posted',
                }}
                sx={{width:'100%',border:'none', height:'40px', color:'#000'}}
                onChange={handleDateChange}
              >
                <MenuItem value={'today' as any}>Today</MenuItem>
                <MenuItem value="lastweek">Last Week</MenuItem>
                <MenuItem value='months' >Months ago</MenuItem>
                
              </Select>
              </FormControl>
      </ListItem>
      
    </List>
    </DialogContent>
    <DialogActions>
      <Button fullWidth variant='outlined'  startIcon={<i className='fal fa-save' /> } onClick={() => dispatch(close())} >Done</Button>
    </DialogActions>
    </ThemeProvider>
    </Dialog>
    )
}

export {FilterDialog}