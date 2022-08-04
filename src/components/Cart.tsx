import * as React from 'react';
import Box from '@mui/material/Box';
import MuiBox from '@mui/material/Box';
import MuiIconButton from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MuiGrid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as Colors from '@mui/material/colors';
import {styled, createTheme} from '@mui/material/styles';
import SwappleIphoneXSilver from '../assets/images/swappie-iphone-x-silver.png';



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
  boxShadow:`2px 2px 15px rgba(0,0,0,0.2)`,
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

  
export default function Cart(){
  const [totalAmount,updateAmount] = React.useState(100);
  
  const calculateTotalCost = () => {
  alert(1)
    if(products.length > 0) {
      for(let i=0; i<products.length; i++){
        let total = eval(`${totalAmount}+${products[i]['amount']}`);
        updateAmount(total);
      }
    }
    alert(totalAmount);
  }
  return (
    <React.Fragment>
      <Box>
      <Grid container >
      <Grid item xs={12} sm={4} sx={{border:' ', height:{xs:'',sm:'70vh'}}}>
      <Typography variant='h5'>
      Operations
      </Typography>
      <BoxModified sx={{backgroundColor:'', display:{xs:'flex',sm:''},flexDirection:{xs:'row',sm:'column'},justifyContent:'space-around'}} >
      <Tooltip title='See my saved Cart' >
      <IconButton startIcon={<i className='fal fa-shopping-cart' />} sx={{color:Colors.yellow[800]}}>
      <Typography sx={{display:{xs:'none',sm:'inline'}}} >My Saved Cart</Typography>
      </IconButton>
      </Tooltip>
      <Tooltip title='Save to Cloud' >
      <IconButton startIcon={<i className='fal fa-save' />} sx={{color:Colors.blue[300]}}>
      <Typography sx={{display:{xs:'none',sm:'inline'}}} >Save to cloud</Typography>
      </IconButton>
      </Tooltip>
      <Tooltip title='Clear Cart'>
      <IconButton startIcon={<i className='fal fa-trash' />} sx={{color:Colors.red[300]}}>
      <Typography sx={{display:{xs:'none',sm:'inline'}}} >Clear Cart</Typography>
      </IconButton>
      </Tooltip>
      <Tooltip title='view as list' >
      <IconButton startIcon={  <i className='fal fa-list' />} sx={{color:Colors.teal[900]}}>
    
       <Typography sx={{display:{xs:'none',sm:'inline'}}} >View as list</Typography>
      </IconButton>
      </Tooltip>
       <Tooltip title='My History' >
      <IconButton startIcon={  <i className='fal fa-history' />} sx={{color:Colors.indigo[800]}}>
    
       <Typography sx={{display:{xs:'none',sm:'inline'}}} >Shopping History</Typography>
      </IconButton>
      </Tooltip>
     
      </BoxModified>
      </Grid>
      <Grid item container xs={12} sm={8} sx={{height:{xs:'',sm:'70vh'}}} >
        
      
      <Box sx={{width:'100%',display:'flex',justifyContent:'space-around',my:2}}>
        <Typography variant='h6'>
          Make Payment:
        </Typography>
        <Typography sx={{color:Colors.common.black,fontWeight:'bold',fontSize:'15pt'}}>
          {totalAmount}
        </Typography>
        <IconButton sx={{color:Colors.common.white,backgroundColor:Colors.yellow[800]}} onClick={calculateTotalCost}>
          <i className='fal fa-visa' />
          Pay
        </IconButton>
        
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
}