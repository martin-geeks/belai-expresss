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
import {useCustomDispatch,useCustomSelector} from '../states/hook';
import {addUser} from '../states/user';
import {main} from '../tools/theme';

function CompleteSetup() {
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
    <ThemeProvider theme={main} >
        <Box
         sx={{background:'',my:{xs:10,sm:50},mx:{xs:0,sm:35}, py:{xs:0,sm:5},border:{xs:'',sm:'0px solid #b6b6b6'},boxShadow:{xs:'',sm:'2px 2px 15px rgba(217,217,200,0.9)'},borderRadius:'10px'}}>
        {loginState? <LinearProgress />: ''}
        <Collapse in={networkState} >
            <Alert color='error' icon={<i className='fal fa-globe' />} >Try again later as the network is bad</Alert> 
            </Collapse>
            <Box sx={{py:5,width:'100%',backgroundColor:'primary.main'}}>
            <Typography>
            
            </Typography>
            <Typography variant='h4' sx={{color:'#fff',fontWeight:'bold'}}>
              <i style={{position:'absolute',fontSize:'1em', display:'block'}} className='fab fa-cc-visa' />
                   <i style={{fontSize:'1em', marginTop:'0px',marginRight:'0px',color:'white',transform:'rotate(70deg)'}}className='fad fa-headphones' />
              <i className='fal fa-shopping-bag' style={{margin:'0px 20px'}} />
              <p style={{display:'inline', fontSize:'2em'}} >
              <svg xmlns="http://www.w3.org/2000/svg" width='400' height='30' viewBox="0 0 700 72" >
                <text style={{fill:Colors.yellow[800],stroke:'#fff',strokeWidth: 2.5}} x="160" y="50">Belai Express</text>
              </svg>
              </p>
              
            </Typography>
             <i style={{position:'absolute',fontSize:'1em', marginTop:'-80px',marginRight:'50px',color:'white',transform:'rotate(70deg)'}}className='fab fa-cc-paypal' />
            <Typography variant='subtitle1' sx={{color:'#fff',fontWeight:'bold'}}>
            <i style={{position:'absolute',fontSize:'2em',display:'block',transform:'rotate(45deg)'}}className='fad fa-shopping-cart' />
              Buy Goods and Services
            <i style={{position:'absolute',fontSize:'2em'}}className='fad fa-store' />
              <i style={{position:'absolute',fontSize:'2em', marginTop:'-80px',marginRight:'50px',color:'white',transform:'rotate(70deg)'}}className='fab fa-google-pay' />
                <i style={{position:'absolute',fontSize:'2em', marginTop:'-130px',marginRight:'2px',color:'white',transform:'rotate(70deg)'}}className='fad fa-tshirt' />
            </Typography>
            </Box>
          <Box component="form" onSubmit={handleSubmit} >
          <Grid container spacing={2} >
          <Grid item xs={12} sm={12} >
            <TextField
              margin="normal"
              required
              variant='outlined'
              id="credential"
              label="Username or Email"
              name="credential"
              autoComplete="username"
              autoFocus
              size='small'
              error={usernameFieldState}
              sx={{width:'80%'}}
            />
            <Collapse in={usernameFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{usernameStatus}</Alert> 
            </Collapse>
             
          </Grid>
           <Grid item xs={12} sm={12} >
            <TextField
              margin="normal"
              required
              variant='outlined'
              id="password"
              label="password"
              name="password"
              autoComplete="password"
             
              size='small'
              type='password'
              sx={{width:'80%'}}
              error={passwordFieldState}
            />
            <Collapse in={passwordFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{passwordStatus}</Alert> 
            </Collapse>
            
          </Grid>
          <Grid item xs={12} sm={12} sx={{position:'relative'}}>
           <Box sx={{display:'none',position:{xs:'fixed',sm:'static'},top:'70%',left:'',width:'100%', backgroundColor:'blue',zIndex:'10%' }}>
            
            <Typography>
            Please wait
            </Typography>
            </Box>
            <Button
              type="submit"
              
              variant="contained"
              sx={{width:'80%',my:1,boxShadow:'none',color:'#fff',textTransform:'none','&: hover':{boxShadow:'none'}}}
            >
              Sign In
            </Button>
            <Button sx={{width:'80%',my:1,border:'3px solid','&:hover':{border:'3px solid'},textTransform:'none'}} variant='outlined' component={Link} to='/sign-up' >
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
export default function SignIn(){
    //@ts-ignore
    const user = JSON.parse(useCustomSelector( (state) => state.user.value));
 if(user.userId){
   return (<Navigate replace to='/'/>)
 } else {
    return (
      <CompleteSetup />
    );
 }
}