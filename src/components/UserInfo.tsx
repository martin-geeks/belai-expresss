import * as React from 'react';
import Box from '@mui/material/Box';
import {useCustomSelector, useCustomDispatch} from '../states/hook';
import {addUser} from '../states/user';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import TextField from '@mui/material/TextField'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'
import {createTheme,ThemeProvider} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import axios from 'axios';
import {getCookie,setCookie} from '../assets/js/cookies';
const theme = createTheme({
  palette:{
    primary:{
      main:Colors.yellow[800]
    },
  }
});

function UserInfoContent(props: any){
  const dispatch = useCustomDispatch();
  const [usernameFieldState,setUsernameFieldState] = React.useState();
  const [statusUsername,setUsernameStatus] = React.useState('');
  const [loadingLocation,setLoadingLocationState] = React.useState(true);
  const [location,setLocation] = React.useState('Fetching your location');
  const [networkState,setNetworkState] = React.useState(false);
  const [usernameState,setUsernameState] = React.useState<boolean> (false);
  const [statusLastname,setLastnameStatus] = React.useState('');
  const [lastnameState,setLastnameState] = React.useState<boolean> (false);
  const [firstnameState,setFirstnameState] = React.useState<boolean> (false);
  const [statusFirstname,setFirstnameStatus] = React.useState<string> ('');
  const [responseState,setResponseState] = React.useState<boolean>(false);
  //const [usernameStatus,setUsernameStatus] = React.useState('');
  const user = props.user;
  React.useEffect(()=>{
    axios.get('https://ipinfo.io?token=08f46b695f4d5e')
    .then((response:any) => {
      setLocation(`${response.data.city}, ${response.data.country}`);
      setLoadingLocationState(false);
    })
    .catch((err: Error)=>{
      
    });
  },[]);
  const inputStatus = {status:false};
  const sendUserUpdate = () => {
    //@ts-ignore
    let data :HTMLElement = document.getElementById('updateForm');
    //@ts-ignore
    if(data.username.value === user.username) {
      setUsernameStatus('Enter a new username');
      setUsernameState(true);
      inputStatus.status = true;
    } else {
      inputStatus.status = false;
      setUsernameState(false);
    }
    //@ts-ignore
    if(data.lastname.value === user.fullname.split(' ')[1] ){
      
      setLastnameStatus('Enter a new lastname');
      setLastnameState(true);
      inputStatus.status = true;
    } else {
      setLastnameState(false);
      inputStatus.status = false;
    }
    //@ts-ignore
    if(data.firstname.value === user.fullname.split(' ')[0] ){
      
      setFirstnameStatus('Enter a new Firstname');
      setFirstnameState(true);
      inputStatus.status = true;
    } else {
      setFirstnameState(false);
      inputStatus.status = false;
    }
    
    if(inputStatus.status == false){
      let newUserInfo = {};
      //@ts-ignore
      if(data.username.value != ''){
        //@ts-ignore
        newUserInfo.username = data.username.value;
      }
      //@ts-ignore
      if(data.firstname.value != ''){
        //@ts-ignore
        newUserInfo.firstname =  data.firstname.value;
      }
      //@ts-ignore
      if(data.lastname.value != ''){
        //@ts-ignore
        newUserInfo.lastname = data.lastname.value;
      }
      //@ts-ignore
      if(Object.values(newUserInfo).length && (data.password.value != '') ){
      //@ts-ignore
      newUserInfo.userId = user.userId
      axios.post('/update',newUserInfo)
      .then((userData:any) => {
        let user = userData.data;
        if(user.status){
          setCookie('belaiexpress',JSON.stringify(user),1);
          dispatch(addUser(getCookie('belaiexpress')));
          setNetworkState(false);
          setResponseState(false);
        } else {
          setResponseState(true);
          setNetworkState(false);
        }
      })
      .catch((err: Error)=>{
        setNetworkState(true);
      });
    }
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(data)
    alert(data)
  }
  return (
    <React.Fragment>
    <Grid container mb={10} >
    <Grid item xs={12} sm={6}>
   <Box sx={{display:{xs:'none',sm:'block'}}} >
      <Dashboard xs={12} sm={12}/>
   </Box>
    </Grid>
    <Grid item xs={12} sm={5} sx={{width:'80%', margin:{xs:'0',sm:'40px'},borderRadius:'10px',borderTop:`0px solid ${Colors.yellow[800]}`,boxShadow:' 0px 0px 3px rgba(0,0,0,0.2)',p:1} }>
      <ThemeProvider theme={theme}>
       <Collapse in={networkState} >
            <Alert color='error' icon={<i className='fal fa-globe' />} >We couldn't connect to the server, try again later.</Alert> 
       </Collapse>
    <Box sx={{width:'100%'}} component='form' onSubmit={handleSubmit} id='updateForm'>
    <Typography textAlign='left' >
    <i className='fal fa-line' />
    Modify/Edit your user information
    </Typography>
  
    <FormControl sx={{width:'100%'}}>
       <TextField
              margin="normal"
              required
              variant='standard'
              id="firstname"
              label={user.fullname.split(' ')[0]}
              name="firstname"
              size='small'
              error={usernameFieldState}
              fullWidth
              helperText='Enter your new firstname above'
            />
              <Collapse in={firstnameState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{statusFirstname}</Alert> 
            </Collapse>
             
              <TextField
              margin="normal"
              required
              variant='standard'
              id="lastname"
              label={user.fullname.split(' ')[1]}
              name="lastname"
              size='small'
              error={usernameFieldState}
              fullWidth
              helperText='Enter your new lastname above'
            />
           <Collapse in={lastnameState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{statusLastname}</Alert> 
            </Collapse>
             <Typography sx={{fontSize:'8pt'}} color='text.secondary' >
              {statusUsername}
            </Typography>
              <TextField
              margin="normal"
              required
              variant='standard'
              id="username"
              label={user.username}
              name="username"
              size='small'
              error={usernameFieldState}
              fullWidth
              helperText='Enter your new username above'
            />
             <Collapse in={usernameState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{statusUsername}</Alert> 
            </Collapse>
           
              <TextField
              margin="normal"
              required
              variant='standard'
              id="location"
              label={location}
              name="location"
              size='small'
              error={usernameFieldState}
              fullWidth
              helperText='Automatic location detection'
              disabled
            />
            { loadingLocation? <LinearProgress />: '' }
             <Typography sx={{fontSize:'8pt'}} color='text.secondary' >
              {statusUsername}
            </Typography>
      </FormControl>
      <Divider />
        <TextField
              margin="normal"
              required
              variant='standard'
              id="password"
              label={'Enter your password to confirm'}
              name="password"
              size='small'
              error={usernameFieldState}
              fullWidth
              type='password'
            />
              <Collapse in={responseState} >
            <Alert color='warning' icon={<i className='fal fa-globe' />} >We couldn't update , try again later.</Alert> 
       </Collapse>
            <Button variant='contained' color='primary' onClick={sendUserUpdate}  >
            confirm
            </Button>
      
    </Box>
      </ThemeProvider>
      </Grid>
      </Grid>
    </React.Fragment>
    );
}

export default function UserInfo(){
  //@ts-ignore
  const user = JSON.parse(useCustomSelector( (state)=> state.user.value));
  if(user.userId){
    return (<UserInfoContent user={user} />);
  } else {
    return (<SignIn />);
  }
}