import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as Colors from '@mui/material/colors';

export default function NotFound(){
  
  return (
    <Box sx={{backgroundColor:Colors.yellow[100],height:'100vh'}}>
      <Typography variant='h2' fontWeight='bold' color={Colors.yellow[800]} >
        404
      </Typography>
      <Typography>
        What you are looking for was not found here...
      </Typography>
      <Typography>
        <List>
          <ListItem>
            <ListItemText secondaryTypographyProps={{color:'#b6b6b6'}}  primary='Check the url entered' secondary='Make sure you entered a valid URL' />
          </ListItem>
          <ListItem sx={{display:'list-item'}}>
            <ListItemText secondaryTypographyProps={{color:'#b6b6b6'}} primary='Make sure your internet connection is alive' secondary='Check your Wi-Fi,Mobile Data or your internet Cable' />
          </ListItem>
          <ListItem>
            <ListItemText secondaryTypographyProps={{color:'#b6b6b6'}}   primary='Try again later' secondary='Our server may be down, or something is wrong' />
          </ListItem>
        </List>
      </Typography>
    </Box>
    );
}