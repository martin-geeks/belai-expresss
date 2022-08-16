import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
//import elementType from '@mui/material/StepLabel';
import StepLabel from '@mui/material/StepLabel';
//import StepIcon from '@mui/material/StepIcon';
import StepContent from '@mui/material/StepContent';
//import StepConnector from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as Colors from '@mui/material/colors';

//import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';
import {useDispatch } from 'react-redux';
import {closeSearch} from '../states/searchBar';
import {setCookie,getCookie} from '../assets/js/cookies.js';
import {addUser} from '../states/user';
//const Avatar: = <i className='fad fa-user' />
import {Link, Navigate} from 'react-router-dom';
import {useCustomDispatch, useCustomSelector} from '../states/hook';
import {nextStep,prevStep,customStep} from '../states/signUp';
const theme = createTheme({
  palette:{
    primary:{
      main:Colors.yellow[800],
    }
  }
});

function EmailPhone() {
  let dispatch = useCustomDispatch();
  let index = useCustomSelector((state)=> state.signUpStep.value);
  const [emailFieldState,setEmailFieldState] = React.useState<boolean>(false);
  const [emailFieldStatus,setEmailFieldStatus] = React.useState<string>('Something went wrong');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let email =  data.get('email');
    //@ts-ignore
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      
      setEmailFieldState(false);
      axios.post('/create-account',{firstTime:true,data:{email:email}})
      .then((data: any) =>{
        if(data.data.status){
          dispatch(nextStep());
        } else {
          setEmailFieldState(true);
          setEmailFieldStatus(data.data.message);
        }
      })
      .catch((err :Error) =>{
        setEmailFieldState(true);
        setEmailFieldStatus('Could\'nt connect to the server');
      });
    } else {
      setEmailFieldState(true);
      setEmailFieldStatus('Enter a valid email address');
    }
  };
  return (
    
      
        
        <Box
        >
          <Box component="form" onSubmit={handleSubmit} id='emailForm' >
            <TextField
              margin="normal"
              required
              
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              
              variant='standard'
              sx={{width:'80%'}}
            />
             <Collapse in={emailFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{emailFieldStatus}</Alert> 
            </Collapse>
             <Button
                    type='submit'
                    variant="contained"
                    
                    
                    sx={{ mt: 1, mr: 1,color:'#fff',borderRadius:'none',boxShadow:'none','&:hover':{boxShadow:'none'}}}
                  >
                    Continue
                  </Button>
                    <Button
                    disabled={ index === 0}
                   
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
          </Box>
        </Box>
      
    
    );
}
function Verification() {
  let dispatch = useCustomDispatch();
  let index = useCustomSelector((state)=> state.signUpStep.value);
  const [codeFieldState,setCodeFieldState] = React.useState<boolean>(false);
  const [codeFieldStatus,setCodeFieldStatus] = React.useState<string>('Something went wrong');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   let code = data.get('code');
   //@ts-ignore
   if(/\d{6}/.test(code)){
      axios.post('/verify-account',{data:code})
      .then((response: any)=>{
        if(response.data.status){
          dispatch(nextStep());
        } else {
          setCodeFieldStatus('Code did not match');
          setCodeFieldState(true);
        }
      })
      .catch((err: Error)=>{
        
         setCodeFieldStatus('We could\'nt connect to the server');
         setCodeFieldState(true);
      });
   } else {
     setCodeFieldStatus('The code must six be digits only');
     setCodeFieldState(true);
   }
    
  };
  return (
        <Box
        >
          <Box component="form" onSubmit={handleSubmit} id='codeForm' >
            <TextField
              margin="normal"
              required
              variant='standard'
              id="verificationCode"
              label="Verification Code"
              name="code"
              autoComplete="code"
            
              sx={{width:'80%'}}
            />
               <Collapse in={codeFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{codeFieldStatus}</Alert> 
            </Collapse>
              <Button
                    type='submit'
                    variant="contained"
                    
                    
                    sx={{ mt: 1, mr: 1,color:'#fff',borderRadius:'none',boxShadow:'none','&:hover':{boxShadow:'none'}}}
                  >
                    Continue
                  </Button>
                    <Button
                    disabled={ index === 0}
                   
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
          </Box>
        </Box>
      
    
    );
}
function CompleteSetup() {
  let dispatch = useCustomDispatch();
  let index = useCustomSelector((state)=> state.signUpStep.value);
  const [usernameFieldState,setUsernameFieldState] = React.useState<boolean>(false);
  const [usernameFieldStatus,setUsernameFieldStatus] = React.useState<string>('Something went wrong');
  const [passwordFieldState,setPasswordFieldState] = React.useState<boolean>(false);
  const [passwordFieldStatus,setPasswordFieldStatus] = React.useState<string>('Something went wrong!');
   const [navigate,setNavigate] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      username: data.get('username'),
      password: data.get('password'),
    }
    //@ts-ignore
    if(fields.password.length >= 6){
      setPasswordFieldState(false);
      axios.post('/create-account',{firstTime:false,fields})
      .then((response: any) =>{
        
        if(response.data.status){
           setCookie('belaiexpress',JSON.stringify(response.data),1);
        dispatch(addUser(getCookie('belaiexpress')));
        //window.open('/')
        } else {
          setUsernameFieldState(true);
          setUsernameFieldStatus(response.data.message);
        }
      })
      .catch((err: Error)=>{
        setPasswordFieldStatus(err.message);
        setPasswordFieldState(true);
      });
    } else {
      setPasswordFieldState(true);
      setPasswordFieldStatus('The password must be six characters long');
    }
  };
  return (
        <Box
        >
         {navigate && <Navigate replace to='/' />}
          <Box component="form" onSubmit={handleSubmit} >
          <Grid container spacing={2} >
          <Grid item xs={12} sm={6} >
            <TextField
              margin="normal"
              required
              variant='standard'
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              
              sx={{width:'80%'}}
            />
          </Grid>
           <Grid item xs={12} sm={6} >
            <TextField
              margin="normal"
              required
              variant='standard'
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              autoFocus
              sx={{width:'80%'}}
            />
          </Grid>
           <Grid item xs={12} >
            <TextField
              margin="normal"
              required
              variant='standard'
              id="username"
              label="Enter username"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{width:'80%'}}
            />   <Collapse in={usernameFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{usernameFieldStatus}</Alert> 
            </Collapse>
          </Grid>
            <Grid item xs={12} >
            <TextField
              margin="normal"
              required
              variant='standard'
              id="password"
              label="Enter Password"
              name="password"
              autoComplete="password"
              autoFocus
              type='password'
              sx={{width:'80%'}}
            />
               <Collapse in={passwordFieldState} >
            <Alert color='error' icon={<i className='fal fa-window-close' />} >{passwordFieldStatus}</Alert> 
            </Collapse>
          </Grid>
              <Button
                    type='submit'
                    variant="contained"
                    
                    
                    sx={{ mt: 1, mr: 1,color:'#fff',borderRadius:'none',boxShadow:'none','&:hover':{boxShadow:'none'}}}
                  >
                    Continue
                  </Button>
                    <Button
                    disabled={ index === 0}
                   
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
            </Grid>
          </Box>
        </Box>
      
    
    );
}
const steps = [
  {
    label: 'Create Account',
    icon:'fal fa-user',
    description: `Enter your Email or Phone number to proceed.`,
    form:<EmailPhone/>,
    id:'stepOne',
  },
  {
    label: 'Verification',
    icon:'fal fa-key',
    description:
      'Enter the code sent to the email provided above',
    form:<Verification />,
    id:'stepTwo',
  },
  {
    label: 'Complete Setup',
    icon:'fal fa-badge-check',
    description: `Fill everything below to complete your membership`,
    form: <CompleteSetup />,
    id:'stepThree',
  },
];

interface CustomIconProps {
  icon: string
}
const CustomIcon = (props: CustomIconProps ) => (<Box sx={{padding:'10px',backgroundColor:Colors.yellow[800],color:Colors.common.white,borderRadius:'50%',width:20,height:20,textAlign:'center'}} component='span'><i className={props.icon} /></Box>)
const CustomStepIcon = styled(CustomIcon)(({theme}) =>({
  backgroundColor:Colors.yellow[800],
  p:2,
  color:Colors.red[700]
}));


export default function VerticalLinearStepper() {
  const dispatch = useCustomDispatch();
  const searchBar = useDispatch();
  searchBar(closeSearch());
  const activeStep = useCustomSelector((state)=> state.signUpStep.value);
  //alert(activeStep);
  const [statusInput, setStatusInput] = React.useState('');
  React.useEffect(()=>{
    axios.get('/create-account')
    .then((data: any)=>{
      dispatch(customStep(data.data.step));
    })
    .catch((err: any)=>{
      
    });
  },[]);
  const handleNext = () => {
    let e = document.getElementById('emailForm');
    let c = document.getElementById('codeForm');
    if(activeStep=== 0){
      // @ts-ignore: Object is possibly 'null'.
      let email = e.email;
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        //setActiveStep((prevActiveStep) => prevActiveStep + 1);
         setStatusInput('');
      } else {
         
        setStatusInput('Enter your email correctly');
      }  
    } else if(activeStep === 1){
      // @ts-ignore: Object is possibly 'null'.
      let code = c.code;
      if(/\d{6}/.test(code.value)){
        //setActiveStep((prevActiveStep) => prevActiveStep + 1);
         setStatusInput('');
      } else {
         
        setStatusInput('Enter the correct code');
      }  
    }
    
  };

  const handleBack = () => {
   // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    //setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box>
    <Box sx={{display:{xs:'block',sm:'none'}, maxWidth:  'xs',mb:10}}>
      <Stepper activeStep={activeStep} orientation={'vertical'}>
        {steps.map((step, index) => (
          <Step  key={step.label}>
          
            <StepLabel
              id={step.id}
              icon={<CustomStepIcon icon={step.icon} />}
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
            
              {step.label}
            </StepLabel>
            
            <StepContent>
              <Typography fontSize={'8pt'}>{step.description}</Typography>
              {step.form}
              <Typography sx={{fontSize:'8pt'}} >
              {statusInput}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
              
                
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    <Box sx={{display:{xs:'none',sm:'block'}, maxWidth:  'xs',mb:10}}>
    <Typography>
      Have an account? <Button component={Link} to='/sign-in' sx={{textTransform:'none',textDecoration:'underline'}}>Login Here</Button>
    </Typography>
 <Stepper activeStep={activeStep} orientation={'horizontal'}>
        {steps.map((step, index) => (
          <Step  key={step.label}>
          
            <StepLabel
              id={step.id}
              icon={<CustomStepIcon icon={step.icon} />}
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
            
              {step.label}
            </StepLabel>
            
            <StepContent>
              <Typography fontSize={'8pt'}>{step.description}</Typography>
              {step.form}
              <Typography sx={{fontSize:'8pt'}} >
              {statusInput}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
              
                
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    </Box>
    </ThemeProvider>
  );
}