import * as React from 'react';
import Box from '@mui/material/Box';
import {useCustomSelector, useCustomDispatch} from '../states/hook';
import {addUser} from '../states/user';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import MuiTextField from '@mui/material/TextField'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import MuiButton from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'
import {styled,createTheme,ThemeProvider} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import Mail from '@mui/icons-material/Mail'
import axios from 'axios';
import {getCookie,setCookie} from '../assets/js/cookies';
const theme = createTheme({
  palette:{
    primary:{
      main:Colors.yellow[800]
    },
  }
});
const Button = styled(MuiButton)(({theme}) =>({
  textTransform:'none',
  borderRadius:'0px',
  color: Colors.common.white,
}));
const TextField = styled(MuiTextField)(({theme})=>({
  borderRadius:'none'
}));
function Content(props: any){
  const user = props.user;
  const [emailFieldState,setEmailFieldState] = React.useState<boolean>(false);
  const [showEmailField,setEmailField] = React.useState<boolean>(false);
  const [statusEmail,setEmailStatus] = React.useState('');
  const showEmail = () => {
    showEmailField? setEmailField(false):setEmailField(true);
    
  }
  const handleNext = () => {
    
  }
  return (
    <React.Fragment>
    
    <Box>
    <ThemeProvider theme={theme} >
      <Grid container >
      <Grid item xs={12} sm={6} >
       <Box sx={{display:{xs:'none',sm:'block'}}} >
          <Dashboard xs={12} sm={12}/>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}  sx={{margin:{xs:'0px',sm:'40px'},borderRadius:'10px',borderTop:`0px solid ${Colors.yellow[800]}`,boxShadow:' 0px 0px 3px rgba(0,0,0,0.2)',p:1}}>
        
          <List>
          <ListItem sx={{display:{xs:'flex',sm:'flex'},flexDirection:'column',width:'100%'}} >
          <ListItemButton onClick={showEmail} >
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary={'Email/Phone'} />
          </ListItemButton>
          <Collapse in={showEmailField} >
          <FormControl>
             <TextField
              margin="normal"
              required
              variant='outlined'
              id="email"
              label={user.email}
              name="email"
              size='small'
              error={emailFieldState}
              
              helperText='Enter your new email address'
            />
              <Collapse in={emailFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{statusEmail}</Alert> 
            
            </Collapse>
            
            <Button>
              <i className='fal fa-arrow-right' />
            </Button>
            </FormControl>
          </Collapse>
          </ListItem>
          </List>
        <FormControl>
        </FormControl>
      </Grid>
      </Grid>
      </ThemeProvider>
    </Box>
    </React.Fragment>
    );
}



export default function SecurityPrivacy(){
  //@ts-ignore
  const user = JSON.parse(useCustomSelector( (state)=> state.user.value));
  if(user.userId){
    return (<Content user={user} />);
  } else {
    return (<SignIn />);
  }
}