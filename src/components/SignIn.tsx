import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import {setCookie,getCookie} from '../assets/js/cookies.js';
import {useCustomDispatch} from '../states/hook';
import {addUser} from '../states/user';
const theme = createTheme({
  palette:{
    primary:{
      main:Colors.yellow[800]
    },
    text:{
      primary:Colors.common.white,
      secondary:Colors.common.black
    }
  }
});

export default  function CompleteSetup() {
  const dispatch = useCustomDispatch();
  const [usernameFieldState,setUsernameFieldState] = React.useState(false);
  const [usernameStatus,setUsernameStatus] = React.useState('none');
  const [statusUsername,setStatusUsername] = React.useState('');
  const [passwordStatus,setPasswordStatus] = React.useState('none');
  const [passwordFieldState,setPasswordFieldState] = React.useState(false);
  const [networkState,setNetorkState] = React.useState(false);
  const [loginState,setLogin] = React.useState(false);
  const [navigate,setNavigate] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    //@ts-ignore
    if(/\d{6}/.test(data.get('password'))){
      setLogin(true);
    axios.post('/login',{username:data.get('credential'),password:data.get('password')})
    .then((resp:any) => {
      setLogin(false);
      if(resp.data.status === false){
        let response = resp.data;
        
        if(response.message == 'Username not found') { setUsernameFieldState(true);
          setUsernameStatus('');
          setUsernameStatus(response.message);
        }
        if(response.email === false){
          setUsernameFieldState(true);
          setUsernameStatus('Email not registered');
          //setUsernameStatus(r);
        }
        if(response.username === true){
          setUsernameFieldState(false);
          
        }
        if(response.message == 'Wrong password'){
          setPasswordFieldState(true);
          setPasswordStatus(response.message);
         
        }
        
        //if(response.email) alert(2)
        
        
      } else if(resp.data.status === true) {
        
        setCookie('belaiexpress',JSON.stringify(resp.data),1);
        dispatch(addUser(getCookie('belaiexpress')));
        setNavigate(true);
        
      }
    })
    .catch((err :any) => {
      setPasswordFieldState(false);
      setUsernameFieldState(false);
      setNetorkState(err);
    });
    } else {
      
    }
  }
  const uuid = () => {
    let uuid = window.self.crypto.randomUUID();
   return uuid;
  }
  return (
    <ThemeProvider theme={theme} >
        <Box
        >
        {loginState? <LinearProgress />: ''}
        <Collapse in={networkState} >
            <Alert color='error' icon={<i className='fal fa-globe' />} >Try again later as the network is bad</Alert> 
            </Collapse>
          <Box component="form" onSubmit={handleSubmit} >
          <Grid container spacing={2} >
          <Grid item xs={12} sm={6} >
            <TextField
              margin="normal"
              required
              variant='outlined'
              id="credential"
              label="Username or Email"
              name="credential"
              autoComplete="username"
              autoFocus
              error={usernameFieldState}
              sx={{width:'80%'}}
            />
            <Collapse in={usernameFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{usernameStatus}</Alert> 
            </Collapse>
             
          </Grid>
           <Grid item xs={12} sm={6} >
            <TextField
              margin="normal"
              required
              variant='outlined'
              id="password"
              label="password"
              name="password"
              autoComplete="password"
              autoFocus
              type='password'
              sx={{width:'80%'}}
              error={passwordFieldState}
            />
            <Collapse in={passwordFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{passwordStatus}</Alert> 
            </Collapse>
            
          </Grid>
          <Grid item xs={6} sm={12} sx={{position:'relative'}}>
           <Box sx={{display:'none',position:{xs:'fixed',sm:'static'},top:'70%',left:'',width:'100%', backgroundColor:'blue',zIndex:'10%' }}>
            
            <Typography>
            Please wait
            </Typography>
            </Box>
            <Button
              type="submit"
              
              variant="contained"
              sx={{margin: '0px auto'}}
            >
              Sign In
            </Button>
            <Button variant='text' component={Link} to='/sign-up' >
            Sign Up
            </Button>
           
            </Grid>
            </Grid>
          </Box>
          {navigate && <Navigate replace to='/' />}
        </Box>
      </ThemeProvider>
    
    );
}