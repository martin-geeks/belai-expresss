import * as React from 'react';
import Box from '@mui/material/Box';
import MuiBox from '@mui/material/Box';
import MuiIconButton from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MuiGrid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom';
import * as Colors from '@mui/material/colors';
import {styled, createTheme,ThemeProvider} from '@mui/material/styles';
import SwappleIphoneXSilver from '../assets/images/swappie-iphone-x-silver.png';
import {main as mainTheme}  from '../tools/theme';
import {useCustomDispatch, useCustomSelector} from '../states/hook';
import {removeByProduct} from '../states/cartItems';

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
interface Product {
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
/*const product: Product = {
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
}*/
var products = new Array();
for(let i=1; i<=10; i++){
  products.push(product);
}
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


export default function Cart(){
  const storedAmount = useCustomSelector((state) => state.cart.amount);
  const [totalAmount,setAmount] = React.useState<string>("5000");
  const [paper,setPaper] = React.useState(0)
  var pop = '0';
  const calculateTotalCost = (amount: string) => {
    //let data = Number(amount);
    let myAmount = eval(`${pop}+${amount}`) ;
    ////Amount('9000');
    pop = myAmount;
    return <Box>{pop}</Box>
  }
  const myCart = useCustomSelector((state) => state.cart.products);
  if(myCart.length > 0) {
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
      <IconButton variant='contained' size='large' startIcon={<i className='fal fa-shopping-cart' />} sx={{borderRadius:'10px',color:'white',boxShadow:'none'}}>
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
        
      {products.map((product,index) => (
        <GridProduct  item xs={12} sm={4} sx={{display:{xs:'flex'},justifyContent:{xs:'space-between'}}}>
        
        <CardMedia component='img' sx={{height:'100px',width:'100px'}} src={product.photo} />
        
         <Typography variant='body1'>
                   <Typography sx={{color:Colors.blue[800],fontWeight:'bold',textAlign:'left'}}>
                    {product.name}
                  </Typography>
                  {handleRating(product.rating)}
                  
                    <Typography variant='subtitle1' sx={{display:'flex',color:Colors.yellow[900],fontWeight:'bold',justifyContent:'space-around'}}>
                      {product.amount} <Typography sx={{fontWeight:'light',textDecoration:'line-through',color:Colors.grey[600],mt:1}}>{product.discount}</Typography>
                    </Typography>
                    <Typography variant='subtitle2' sx={{display:'inline'}}>
                       <i className='fal fa-dash' />
                       
                    </Typography>
                  { calculateTotalCost(product.amount)}
                  </Typography>
                  <Tooltip title='Clear Cart'>
      <IconButton startIcon={<i className='fal fa-trash' />} sx={{color:Colors.red[300]}}>
      <Typography sx={{display:{xs:'none',sm:'inline'}}} >Clear Cart 
        
      </Typography>
      </IconButton>
      </Tooltip>
      
        </GridProduct>
      ))}
        </Grid>
      </Grid>
     
      </Box>
    </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Box>
            <Typography variant='h5' sx={{fontWeight:'bold',textAlign:'left'}}>
      My Cart List
      </Typography>
      
      <BoxModified sx={{backgroundColor:'', display:{xs:'flex',sm:''},flexDirection:{xs:'row',sm:'column'},justifyContent:'space-around'}} >
      <ThemeProvider theme={mainTheme} >
      <Tooltip title='See my saved Cart' >
      <IconButton variant='contained' size='large' startIcon={<i className='fal fa-shopping-cart' />} sx={{borderRadius:'10px',color:'white',boxShadow:'none'}}>
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
      <ThemeProvider theme={mainTheme}>
            <Typography sx={{my:20,color:'#b6b6b6',textAlign:'center'}}>
           
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
}