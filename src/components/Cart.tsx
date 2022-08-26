import * as React from 'react';
import Box from '@mui/material/Box';
import MuiBox from '@mui/material/Box';
import MuiIconButton from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MuiGrid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom';
import * as Colors from '@mui/material/colors';
import {Product} from './Home';
import {styled, createTheme,ThemeProvider} from '@mui/material/styles';
import SwappleIphoneXSilver from '../assets/images/swappie-iphone-x-silver.png';
import {main as mainTheme}  from '../tools/theme';
import {useCustomDispatch, useCustomSelector} from '../states/hook';
import {removeByProduct,getFromCart,addProducts, increment,CartItemType} from '../states/cartItems';
import {getCookie} from '../assets/js/cookies.js'
import axios from 'axios';
const IconButton = styled(MuiIconButton)(({theme}) => ({
  borderRadius:0,
  m:{sm:4},
  textTransform:'none'
}));
const IconMobileButton = styled(MuiIconButton)(({theme}) => ({
  borderRadius:0,
  m:{sm:4},
  textTransform:'none',
  width:'100%',
  '&:hover' :{color:Colors.common.black},
}));


const BoxModified = styled(MuiBox)(({theme}) =>({
  backgroundColor:'',
  borderRadius:'5px',
  padding:5,

}));


const GridProduct = styled(Grid)(({theme}) =>({
  border:`0.5px solid ${Colors.grey[300]}`,
  boxShadow:'1px 1px 1px rgba(0,0,0,0.1)',
  padding:'2px',
  borderRadius:'5px',
  transform:'scale(-2px)'
}));
/*interface Product {
    name: string
    amount: string
    rating: Number
    photo: string
    model: string
    brand: string
    manufacturer: string
    variants: Array<Object>
    description: string
    discount: string
}
const product: Product = {
  name: 'iPhone X Silver',
  amount: '999.50',
  rating: 3,
  photo: SwappleIphoneXSilver,
  model: 'X series',
  brand: 'iPhone',
  manufacturer: 'Apple Company',
  variants: [{}],
  description: 'Data Typed',
  discount: 'K200',
}
const product: Product = {
  name: 'iPhone X Silver',
  amount: 'ZMW 999.50',
  rating: 3,
  photo: SwappleIphoneXSilver,
  model: 'X series',
  brand: 'iPhone',
  manufacturer: 'Apple Company',
  variants: [{}],
  description: 'Data Typed',
  discount: 'K200',
}
var products = new Array();
for(let i=1; i<=10; i++){
  products.push(product);
}*/
const handleRating = (rating: number) => {
    let stars = []
    for(let i=1; i<= rating; i++) {
      stars.push(<Typography sx={{color:Colors.yellow[800],fontSize:'8pt'}}><i className='fas fa-star' /></Typography>);
    }
    let unstarred = 5 - rating;
    for(let n=1; n<= unstarred; n++){
      stars.push(<Typography sx={{fontSize:'8pt'}}><i className='fal fa-star' /></Typography>)
    }
    return <Box sx={{display:'flex'}}>{stars}</Box>
  }
var cost = 0;
interface TypeCart {
  productId:string;
  count: number;
}
interface TypeResponse {
  status: boolean;
  cart: TypeCart[];
  products: Product[];
}
interface TypeProps {
  message:string;
}
interface TypeResponse2 {
  message: string;
  data: any
}
function EmptyCart(props:TypeProps){
  
    return (
      <React.Fragment>
      <Box sx={{width:'100%'}}>
      <ThemeProvider theme={mainTheme}>
            <Typography sx={{my:20,color:'#b6b6b6',textAlign:'center'}}>
           {process.env.REACT_APP_TOKEN}
             <i className='fal fa-shopping-basket' style={{fontSize:'3em'}} />
    <Typography> There is nothing in the cart at the moment</Typography>
     <Tooltip title='My History' >
           <Fab sx={{boxShadow:'none',color:'white',my:2}} variant="circular" size='large' color={'primary'} component={Link} to='/' >
              <i className='fad fa-cart-plus' />
        
      
       <Typography sx={{display:{xs:'none',sm:'inline'}}} >Shopping History</Typography>
      </Fab>
      </Tooltip>
      </Typography>
        </ThemeProvider>
        
        </Box>
      </React.Fragment>
      )
  
}


export default function Cart(){
  //const [myCart,setMyCart] = React.useState<Product[]>([]);
  const [state,setState] = React.useState<boolean>(false);
  const [responseMessage,setMessage] = React.useState<string>('Nothing to show here');
  var [pop,setPaper] = React.useState(0)
  const storedAmount = useCustomSelector((state) => state.cart.amount);
  //@ts-ignore
  const user = JSON.parse(getCookie('belaiexpress'));
  const [totalAmount,setAmount] = React.useState<string>("5000");
  
  const calculateTotalCost = (amount: string) => {
    //let data = Number(amount);
    let myAmount = eval(`${pop}+${amount}`) ;
    ////Amount('9000');
    pop = myAmount;
    return <Box>{pop}</Box>
  }
  
  const myCart = useCustomSelector((state) => state.cart.myProducts);
  const dispatch = useCustomDispatch();
    //@ts-ignore
  React.useEffect(()=>{
    
    
    axios.get('/api/v2/cart',{
        headers:{
        'Authorization': `${user.userId}`,
      }
    })
    .then((response)=>{
      if(response.data.status){
        if(response.data.cart.length > 0){
          response.data.cart.forEach((product:CartItemType, index:number)=>{
            dispatch(increment({productId:product.productId,product:product,count:product.count, amount:response.data.amount}));
            //alert(response.data.amount)
          });
        }
      }
      if(response.data.status) return dispatch(addProducts(response.data.products));
    })
    .catch((err:Error)=>{
      alert(err);
    });
    
  },[]);
  const view = () => {
    alert(myCart.length);
  }
  return (
    <React.Fragment>
      <Box>
      
      <Grid container >
      <Grid item xs={12} sm={4} sx={{border:' ', height:{xs:'',sm:'70vh'}}}>
      <Typography variant='h5' sx={{fontWeight:'bold',textAlign:'left'}}>
      My Cart List
      </Typography>
      
      <BoxModified sx={{backgroundColor:'', display:{xs:'flex',sm:''},flexDirection:{xs:'row',sm:'column'},justifyContent:'space-around'}} >
      <ThemeProvider theme={mainTheme} >
      <Tooltip title='See my saved Cart' >
      <IconButton variant='contained' size='large' startIcon={<i className='fal fa-shopping-cart' />} sx={{borderRadius:'10px',color:'white',boxShadow:'none'}} onClick={view}>
      <Typography sx={{display:{sm:'inline',fontWeight:'bold'}}} >Proceed to payment</Typography>
      </IconButton>
      </Tooltip>
      
      
     
      <Tooltip title='view as list' >
        <Fab sx={{boxShadow:'none',color:'white'}} variant="circular" size='small' color={'primary'}>
              <i className='fad fa-list' />
        </Fab>
      </Tooltip>
       <Tooltip title='My History' >
           <Fab sx={{boxShadow:'none',color:'white'}} variant="circular" size='small' color={'primary'}>
              <i className='fad fa-history' />
        
      
       <Typography sx={{display:{xs:'none',sm:'inline'}}} >Shopping History</Typography>
      </Fab>
      </Tooltip>
     </ThemeProvider>
   
      </BoxModified>
        <Typography variant='body1' sx={{my:2,mx:2,textAlign:'center'}}>
      <i className='fad fa-info-circle' style={{color:Colors.red[600]}}/> We advise you to recheck the list of items you clicked for buying before making your payment
     </Typography>
      </Grid>
      <Grid item container xs={12} sm={8} sx={{height:{xs:'',sm:'70vh'}}} >
        
      
      <Box sx={{width:'100%',display:'flex',justifyContent:'space-around',my:2}}>
        <Typography >
          Total Amount
        </Typography>
        <Typography>
        <i className='fal fa-arrow-right' />
        </Typography>
        <Typography sx={{color:Colors.blue[600],fontWeight:'bold',fontSize:'15pt'}}>
          K{storedAmount}
        </Typography>
      
        
      </Box>
      <ThemeProvider theme={mainTheme} >
        {myCart.length > 0? <Box sx={{width:'100%'}}>
       
        <List>
        {myCart.map((cartItem,index)=>(
          <ListItem sx={{display:'flex',justifyContent:'space-between',boxShadow:'2px 3px 12px rgba(217,217,217)'}} >
            <img height='100px' src={SwappleIphoneXSilver} width='100px' alt={cartItem.name} style={{border:`2px solid ${Colors.yellow[800]}`,borderRadius:'5px'}} />
            <CardContent sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
            <Box >
              <Typography>
              Quantity
              </Typography>
              <IconButton size='small'>
              <i className='fal fa-plus'/>
              
              </IconButton>
              <Typography textAlign={'center'} >
              1
              </Typography>
               <IconButton size='small'>
              <i className='fal fa-minus'/>
              
              </IconButton>
            </Box>
            <Box>
              <Typography sx={{fontWeight:'bold',textAlign:'left',colot:Colors.indigo[800],mb:2}}>
              {cartItem.name}
              </Typography>
                 <Typography>
              {handleRating(cartItem.rating)}
              </Typography>
              <Typography sx={{mt:1}}>
                <i className='fal fa-dollar' />
                {cartItem.amount}
              </Typography>
           
              </Box>
            </CardContent>
          </ListItem>
        ))}
        </List>
        </Box>: <EmptyCart message={responseMessage} />}
        </ThemeProvider>
        </Grid>
      </Grid> 
      </Box>
    </React.Fragment>
    )
 
}