import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiButton from '@mui/material/Button';
import {styled,ThemeProvider} from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as Colors from '@mui/material/colors';
import axios from 'axios';
import {main} from '../tools/theme';

export interface Notification {
  title: string;
  body: string;
  pictures: string[];
  urls: string[];
  notificationId:string;
  createdAt: Date;
}
const notification: Notification = {
  title: 'Order Completed',
  body:'Ubiquehis dictas oporteat nostrum mel aliquet epicuri quo theophrastus volumus.  Expetendaoption repudiandae oratio blandit dolorem habitant quem torquent facilisi meliore altera mollis.  Docendiwisi ligula malorum aliquam dictum cum ornare primis mandamus inceptos reprimique consectetuer convenire nam quam nonumy doming tortor.  Egestasepicuri expetendis eget eos bibendum solet movet turpis phasellus quaerendum.',
  pictures:[''],
  urls:['https://zeiro.com','https://zamostudio.com'],
  notificationId:'--"_466777&_$3357',
  createdAt: new Date(),
}
const notifications: Notification[] = [];
notifications.push(notification)
notifications.push(notification)
notifications.push(notification)
const Button = styled(MuiButton)(({theme}) =>({
  textTransform: 'none',
  boxShadow:'none',
  '&:hover' :{
    boxShadow:'none'
  }
}));
const Menu = styled(MuiMenu)(({theme}) =>({
  boxShadow:'none'
}))
const ITEM_HEIGHT = 48;
export default function Notification(){
  const [bodyState,setBodyState]= React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function showAll(btn: any){
    const collapseContent = document.getElementById('collapseContent');
    for(let i in btn) {
      //alert(i)
    }
    
    (bodyState === true)? setBodyState(false): setBodyState(true);
  }
  
  /*React.useEffect(()=>{
    axios.get<Notification>('/api/notifications')
    .then( notifications => {
      
    })
    .catch(err => {
      
    });
  });*/
  return (
    <React.Fragment>
    <ThemeProvider theme={main} >
    <Grid container>
      <Grid item xs={12} sm={6} >
      <Box sx={{display:'flex',justifyContent:'space-around'}} >
    <Typography variant='h5'>
      Notifications
    </Typography>
      <Button variant='contained' sx={{color:'text.secondary'}} >
      Mark all as unread
      </Button>
    </Box>
    <Divider sx={{my:2}}  />
        <List>
          {notifications.map((notification,i)=>(
          <ListItem  sx={{display:'flex',flexDirection:'column',border:'2px solid #f6f6f6',borderRadius:'', backgroundColor:'',my:1,boxShadow:''}}>
          <Box sx={{width:'100%'}} color='error' >
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        
          <Typography variant='h5' fontWeight={'bold'} color='text.primary' >
            <i className='fal fa-bell'  style={{marginRight:'20px'}}/>
          {notification.title}
          
          </Typography>
          <Button
            aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
                >
            <MoreVertIcon />
          </Button>
          <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight:ITEM_HEIGHT * 4.6,
            width: '20ch',
            boxShadow:'2px 2px 2px 2px rgba(217,217,200,0.5)',
            borderRadius:0,
            
          },
        }}
      >
           <MenuItem  key='Save' onClick={handleClose}>
          <i className='fal fa-save' /> <Typography m={1} >Keep</Typography>
          </MenuItem> 
          <MenuItem  key='dismiss' onClick={handleClose}>
          <i className='fal fa-window-close' /> <Typography m={1}>Dismiss </Typography>
          </MenuItem>
            <MenuItem  key='dismiss' onClick={handleClose}>
          <i className='fal fa-flag' /> <Typography m={1}>Report</Typography>
          </MenuItem>
          
        
      </Menu>
          </Box>
             <Collapse in={bodyState} collapsedSize={'40px'} >
                {notification.body}
              </Collapse>
          <ListItemButton id='collapseContent' onClick={showAll} sx={{color:Colors.blue[600],display:'flex',justifyContent:'space-between'}} >
          
       
          <Typography variant='inherit' sx={{fontSize:'8pt',mx:1}} >
             <i style={{margin:'0px 5px'}} className='fal fa-chevron-down' />
          See More</Typography>
          <time style={{fontSize:'7pt',color:Colors.blue[400]}}>{notification.createdAt.getDay()}/{notification.createdAt.getMonth()}/{notification.createdAt.getFullYear()}</time>
          </ListItemButton>
          </Box>
          
         
          </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
    </ThemeProvider>
    </React.Fragment>
    );
}