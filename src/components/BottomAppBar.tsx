import * as React from 'react';
import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
//import Button from '@mui/material/Button';
import * as Colors from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Link} from 'react-router-dom';
/* REACT REDUX   */
import {useCustomSelector} from '../states/hook';
//import {} from '../states/cartItems';


const theme = createTheme({
  palette: {
    primary: {
      main: Colors.yellow[800],
    },
  },
});





const AppBar = styled(MuiAppBar)(({theme}) => ({
  backgroundColor: '',
  boxShadow:'2px 5px 10px rgba(0,0,0,0.1)',
}));



const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  display:'none'
});


function BottomAppBar() {
  
  const cartNumber = useCustomSelector((state) => state.cart.value);
  
  return (
    <React.Fragment>
    
      <AppBar position="fixed"  color="primary" sx={{ top: 'auto', bottom: 0 , display:{xs:'block',sm:'none'}}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
        <ThemeProvider theme={theme} >
          <IconButton component={Link} to='/' aria-label="open drawer">
            <i className='fal fa-home-alt' />
          </IconButton>
          <IconButton component={Link} to={'/cart'}>
          <Badge badgeContent={cartNumber} color='error'>
          <i className='fal fa-shopping-bag' />
          </Badge>
          </IconButton>
          <StyledFab color="secondary" aria-label="add" >
            
          </StyledFab>
          
          <IconButton  component={Link} to='/test' color="inherit">
          <Badge badgeContent={4} color='error' >
            <i className='fal fa-bookmark' />
            </Badge>
          </IconButton>
          <IconButton component={Link} to='/dashboard' color="inherit">
            <i className='fal fa-user-circle' />
          </IconButton>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      
    </React.Fragment>
    )
}


export default BottomAppBar;