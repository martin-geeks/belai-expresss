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
import {useDispatch } from 'react-redux';
import {closeSearch} from '../states/searchBar';
//const Avatar: = <i className='fad fa-user' />
const theme = createTheme();

function EmailPhone() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              autoFocus
              variant='standard'
              sx={{width:'80%'}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,display:'none'}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      
    
    );
}
function Verification() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              autoFocus
              sx={{width:'80%'}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,display:'none'}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      
    
    );
}
function CompleteSetup() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
        <Box
        >
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
              autoFocus
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
            />
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
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,display:'none'}}
            >
              Sign In
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
const CustomIcon = (props: CustomIconProps ) => (<Box sx={{padding:'10px',backgroundColor:Colors.blue[800],color:Colors.common.white,borderRadius:'50%',width:20,height:20,textAlign:'center'}} component='span'><i className={props.icon} /></Box>)
const CustomStepIcon = styled(CustomIcon)(({theme}) =>({
  backgroundColor:Colors.blue[800],
  p:2,
  color:Colors.red[700]
}));


export default function VerticalLinearStepper() {
  const searchBar = useDispatch();
  searchBar(closeSearch());
  const [activeStep, setActiveStep] = React.useState(0);
  const [statusInput, setStatusInput] = React.useState('');
  
  const handleNext = () => {
    let e = document.getElementById('emailForm');
    let c = document.getElementById('codeForm');
    if(activeStep=== 0){
      // @ts-ignore: Object is possibly 'null'.
      let email = e.email;
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
         setStatusInput('');
      } else {
         
        setStatusInput('Enter your email correctly');
      }  
    } else if(activeStep === 1){
      // @ts-ignore: Object is possibly 'null'.
      let code = c.code;
      if(/\d{6}/.test(code.value)){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
         setStatusInput('');
      } else {
         
        setStatusInput('Enter the correct code');
      }  
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ maxWidth:  'xs',mb:10}}>
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
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
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
    </ThemeProvider>
  );
}