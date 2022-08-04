import * as React from 'react';
import {useCustomSelector} from '../states/hook';
import SignIn from './SignIn';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import * as Colors from '@mui/material/colors';
import {Link, Navigate} from 'react-router-dom';
import '../assets/css/gradients.css';
import Avatar from '../assets/images/avatar2.png'




function DashboardContent(props: any){
  const user = props.user;
  //alert(JSON.stringify(props))
  const uuid = () => {
    let uuid = window.self.crypto.randomUUID();
   return uuid;
  }
  return (
    <React.Fragment>
      <Box my={5}>
        <Grid container >
          <Grid item xs={props.xs} sm={props.sm} lg={80} sx={{backgroundColor:''}}>
            <Box sx={{width:'80%',margin:'0px auto',p:1,borderRadius:'5px',borderTop:`10px solid ${Colors.yellow[800]}`,boxShadow:' 0px 0px 3px rgba(0,0,0,0.2)'} } className=''>
              <img src={Avatar} width='100px' height='100px' alt='Me' />
              <Typography>
                {user.fullname}
              </Typography>
            </Box>
            <Box sx={{display:{xs:'flex'},width:'80%',justifyContent:'space-around',p:1,margin:'10px auto',borderRadius:'5px',fontSize:'10pt', boxShadow:' 0px 0px 3px rgba(0,0,0,0.2)',borderBottom:`10px solid ${Colors.yellow[800]}`,borderTop:'none'}} className=''>
            <Box>
              <Badge badgeContent={2} color='warning'>
              <IconButton size='small' >
                <i className='fal fa-history' />
                
              </IconButton>
              
              </Badge>
              <Typography>History</Typography>
            </Box>
               <Box>
              <Badge badgeContent={2} color='success' >
              <IconButton size='small' >
                <i className='fad fa-hand-holding' />
                
              </IconButton>
              
              </Badge>
              <Typography>In transit</Typography>
            </Box>
               <Box>
              <Badge badgeContent={0}>
              <IconButton size='small' >
                <i className='fab fa-cc-mastercard' />
                
              </IconButton>
              
              </Badge>
              <Typography>Make Order</Typography>
            </Box>
            </Box>
          </Grid>
          <Grid xs={props.xs} sm={props.sm} >
            <Box sx={{width:'80%',margin:'0px auto',borderRadius:'5px',borderTop:`0px solid ${Colors.yellow[800]}`,boxShadow:' 0px 0px 3px rgba(0,0,0,0.2)',p:1,mb:10} } >
            <List>
             
              
                <ListItemButton sx={{height:'40px',my:2}} component={Link} to='/user-info'>
                <ListItemIcon>
                  <i className='fal fa-user' />
                </ListItemIcon>
                  <ListItemText  secondaryTypographyProps={{color:'grey'}} primary='Public info' secondary='Photo,User info, Location ' />
                </ListItemButton>
                <ListItemButton sx={{height:'40px',my:2}} component={Link} to='/security-privacy' >
                <ListItemIcon>
                  <i className='fal fa-lock' />
                </ListItemIcon>
                  <ListItemText  secondaryTypographyProps={{color:'grey'}} primary='Security & Privacy' secondary='Passwords, Cards and publicity' />
                </ListItemButton>
                 <ListItemButton sx={{height:'40px',my:1}}>
                <ListItemIcon>
                  <i className='fal fa-city' />
                </ListItemIcon>
                  <ListItemText  secondaryTypographyProps={{color:'grey'}} primary='Customer Services' secondary='Buying,Selling & Check-Ins' />
                </ListItemButton>
                 <ListItemButton sx={{height:'40px',my:2}}>
                <ListItemIcon>
                  <i className='fal fa-user-md-chat' />
                </ListItemIcon>
                  <ListItemText  secondaryTypographyProps={{color:'grey'}} primary='Feedback' secondary='Enjoying our services? Rate us' />
                </ListItemButton>
            
             <ListItemButton sx={{height:'40px',my:2}}>
                <ListItemIcon>
                  <i className='fal fa-flag' />
                </ListItemIcon>
                  <ListItemText  secondaryTypographyProps={{color:'grey'}} primary='About Us' secondary='Establishment,Map and Check-Ins' />
                </ListItemButton>
                 <ListItemButton sx={{height:'40px',my:2}}>
                <ListItemIcon>
                  <i className='fal fa-lock' />
                </ListItemIcon>
                  <ListItemText  secondaryTypographyProps={{color:'grey'}} primary='Share us' secondary='Link,Facebook,Twitter & TikTok' />
                </ListItemButton>
                </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
    )
}


export default function Dashboard (props: any){
  //@ts-ignore
  const user = JSON.parse(useCustomSelector( (state) => state.user.value));
//alert(JSON.stringify(user))
 if(user.userId){
   return (<DashboardContent xs={props.xs} sm={props.sm} user={user} />)
 } else {
    return (
      <Navigate replace to='/sign-in' />
    );
 }
  

}