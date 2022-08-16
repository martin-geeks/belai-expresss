import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'; 
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
//import ManageSearch from '@mui/icons-material/ManageSearch';
//import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import MuiDrawer from '@mui/material/Drawer';
import {Link} from 'react-router-dom';
import {FilterDialog} from './Dialogs';
import avatar from '../assets/images/avatar1.png';
import logo from '../assets/images/logo.png';
import '../assets/fontawesome-pro-5.15.1-web/css/all.css';
import {useCustomSelector, useCustomDispatch}  from '../states/hook';
import {showSearch,closeSearch} from '../states/searchBar';
import {show} from '../states/filterDialog';
import Collapse from '@mui/material/Collapse'
const drawerWidth = 250;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor:'#f6f6f6',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    color:'#000',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const AppBar = styled(MuiAppBar)(({theme}) => ({
  color:'inherit',
  backgroundColor: '',
  boxShadow:'none',
}));

const Drawer = styled(MuiDrawer)(({theme}) =>({
  borderLeft:`2px solid ${Colors.blue[700]}`,
  
}));
const Navigation = () => (
  <Toolbar sx={{display:{xs:'none',sm:'flex'},justifyContent:'space-between', width:'50%'}}>
        
          <IconButton aria-label="open drawer">
            <i className='fal fa-home' />
          </IconButton>
          <IconButton>
          <Badge badgeContent={1} color='error'>
          <i className='fal fa-shopping-bag' />
          </Badge>
          </IconButton>
          
          
          <IconButton color="inherit">
          <Badge badgeContent={4} color='error' >
            <i className='fal fa-bookmark' />
            </Badge>
          </IconButton>
          <IconButton component={Link} to='/notifications' color="inherit">
            <i className='fal fa-bell' />
          </IconButton>
          
        </Toolbar>
  )
interface MyLink {
  url:string
  title: string
  icon: JSX.Element
}
type Links = Array<MyLink>
const links : Links = [
  {title:'Orders',url:'/my-puchases',icon:<i className='fad fa-shopping-cart' />},
  {title:'Recent',url:'/my-puchases',icon:<i className='fad fa-history' />},
  {title:'Login',url:'/login',icon:<i className='fad fa-sign-in' />},
  {title:'Promo',url:'/promotion',icon:<i className='fad fa-megaphone' />},
  {title:'Settings',url:'/my-puchases',icon:<i className='fad fa-cog' />},
  {title:'Q & A',url:'/q&a',icon:<i className='fad fa-question-circle' />},
  {title:'About',url:'/my-puchases',icon:<i className='fad fa-flag' />}
  
  ]
const drawerContent = (
  <List>
  <ListItem sx={{backgroundColor:Colors.yellow[800],p:5,width:'100%'}}>
    <img src={logo} width={50} height={50} />
    <Typography variant='h6' fontWeight={'bold'} m={'-10px 10px'} color={'text.secondary'} >Belai Express </Typography>
  </ListItem>
  <ListItem>
    <img src={avatar} width={100} height={100} />
    <Typography>
    Martin Tembo
    </Typography>
  </ListItem>
  {links.map((link,index)=>(
    <ListItem sx={{width:'100%'}}>
      
      <Button startIcon={link.icon} sx={{textTransform:'none',color:'text.primary','&: hover':{borderRadius:'1px',backgroundColor:Colors.yellow[800],color:'white',boxShadow:'1px 1px 1px rgba(0,0,0,0.2)'},display:'flex',justifyContent:'space-around',width:'100%'}} component={Link} to={link.url}>{link.title} </Button>
    </ListItem>
    ))}
  </List>
  )
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  display:'none'
});
export default function SearchAppBar(props: Props) {
  //@ts-ignore
   const user = JSON.parse(useCustomSelector( (state) => state.user.value));
   const cartNumber = useCustomSelector((state) => state.cart.value);
  const searchBarState = useCustomSelector((state) => state.search.value);
  const [collapseSearch,setSearch] = React.useState<boolean>(false);
  const [showFilter,setFilter] = React.useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const { window } = props;
  type Toggle = true | false;
  const [state,setState] : any = React.useState(false);
  const toggleSearch = () =>{
    (collapseSearch === false)? setSearch(true):setSearch(false);
  }
  const [Dialog,setActive] = React.useState(<FilterDialog state={false}/>);
  const toggleFilter = () => {
    (showFilter === false)? setFilter(true): setFilter(false);
  }
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar sx={{display:'flex',justifyContent:'space-between',flexDirection:{xs:'row'}}}>
          <Box ml={-1}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <IconButton   sx={{display:{xs:'',sm:'none'},ml:-1,fontSize:'15pt'}} onClick={()=> toggleSearch()}>
            <i className='fal fa-search' />
            </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline' }}}
          >
            Belai Express
          </Typography>
          </Box>
         
          
          <Box sx={{display:'flex',width:'60%',justifyContent:'space-around'}}>
          
          <IconButton sx={{display:{xs:'none',sm:'block'}}} component={Link} to='/' aria-label="open drawer">
            <i className='fal fa-home-alt' />
          </IconButton>
          <IconButton sx={{display:{xs:'none',sm:'block'}}}  component={Link} to={'/cart'}>
          <Badge badgeContent={cartNumber} color='error'>
          <i className='fal fa-shopping-bag' />
          </Badge>
          </IconButton>
          <StyledFab color="secondary" aria-label="add" >
            
          </StyledFab>
          
          <IconButton sx={{display:{xs:'none',sm:'block'}}}  component={Link} to='/test' color="inherit">
          <Badge badgeContent={4} color='error' >
            <i className='fal fa-bookmark' />
            </Badge>
          </IconButton>
         
         
            <Search sx={{backgroundColor:`rgba(100,100,102,0.1);`,borderRadius:0,display:{xs:'none',sm:'block'}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <IconButton sx={{display:{xs:'none',sm:'block'}}}  component={Link} to='/notifications' >
            
            <i className='fal fa-bell' />
            </IconButton>
           
             <IconButton sx={{display:{xs:'none',sm:'inline'}}} component={Link} to='/dashboard' color="inherit">
            <i className='fal fa-user-circle' />
          </IconButton>
          </Box>
             <IconButton sx={{display:{xs:'inline',sm:'none'}}}  component={Link} to='/notifications' >
            
            <i className='fal fa-bell' />
            </IconButton>
        </Toolbar>
       
        <Collapse collapsedSize={0} in={collapseSearch} >
            <Box sx={{display:'flex',py:2,justifyContent:'space-around',width:'90%'}}>
            <Search sx={{backgroundColor:'#f6f6f6',width:'90%'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </Search>
          <Tooltip title='Set Filter'>
              
            <IconButton  onClick={toggleFilter}>
            <i className='fal fa-sliders-h' />
            </IconButton>
          </Tooltip>
          </Box>
          <Collapse in={showFilter} >
          Filters
          </Collapse>
          </Collapse>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor='right'
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
          
        </Drawer>
        </Box>
    </Box>
  );
}
