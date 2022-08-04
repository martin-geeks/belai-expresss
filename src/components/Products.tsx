import * as React from 'react';
//import {getProducts } from '../api/product';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import iphone3 from '../assets/images/iphone3.jpg';
import iphonex2 from '../assets/images/iphonex2.jpg';
import iphonex from '../assets/images/iphonex.jpg';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import *  as Colors from '@mui/material/colors';
import {styled,createTheme,ThemeProvider} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';

//import SwipeableViews from 'react-swipeable-views';
//import {AutoPlay} from 'react-swipeable-views-utils';
import { useCustomDispatch } from '../states/hook';
import {add,remove} from '../states/cartItems';
import avatar from '../assets/images/avatar1.png';
import '../assets/css/control.css';
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react';
import {Grid as MyGrid,Keyboard,Lazy,Pagination,Navigation,EffectCreative} from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Product {
    name: string
    amount: string
    rating: Number
    photos: Array<string>
    model: string
    brand: string
    manufacturer: string
    variants: Array<Object>
    description: string
    discount: string
    specifications: Array<Object>
    shipping: Array<Object>
    about: string
}
const product: Product = {
  name: 'iPhone X Silver',
  amount: 'ZMW 999.50',
  rating: 3,
  photos: [iphonex,iphone3,iphonex2],
  model: 'X series',
  brand: 'iPhone',
  manufacturer: 'Apple Company',
  variants: [{}],
  description: 'Data Typed',
  discount: 'K200',
  specifications: [{'NETWORK':'GSM/HSPA'},{'LAUNCH':'September 2017'},{'DISPLAY':'TYPE=[Super Retina OLED, HDR10, Dolby Vision, 625 nits (HBM)]\nSIZE=(5.8 inches, 84.4 cm2 ~82.9% screen-to-body ratio),\n RESOLUTION=[1125 x 2436 pixels, 19.5:9 ratio (~458 ppi density)] \b \n PROTECTION=[Scratch-resistant glass, oleophobic coating ,Wide color gamut,3D Touch,True-tone]'},{'PLATFORM':'OS=[iOS 11.1.1, up to iOS 15.5, planned upgrade to iOS 16],CHIPSET=[Apple A11 Bionic (10 nm)] CPU=[Hexa-core 2.39 GHz (2x Monsoon + 4x Mistral)] GPU=[Apple GPU (three-core graphics)] '}],
  shipping: [{'location':'Lusaka','time':'1 hour','cost':0}],
  about: 'explicari nisl viderer ullamcorper hac ut purus aenean. libris aeque sumo autem usu pulvinar nascetur numquam nobis ludus noster nam postea sententiae. '
}
interface Review {
  username: string
  fullname: string
  comment: string
  profile: string
  rating: number
  date: string
}

const review: Review = {
  username: 'martintembo1',
  fullname: 'Martin Tembo',
  comment:`ultrices epicurei vix vehicula detraxit reque prompta sollicitudin quod. gravida risus luptatum doctus reprehendunt euismod doctus. voluptatibus his intellegebat alterum civibus latine. `,
  profile:avatar,
  rating:4,
  date: '12/12/2022',
}

const Accordion = styled(MuiAccordion)(({theme})=>({
  boxShadow:'none'
}));
const AccordionSummary = styled(MuiAccordionSummary)(({theme})=>({
  backgroundColor:Colors.yellow[800],
  color:'white',
  textTransform:'uppercase',
}));
interface ShippingDetail {
  location:string 
  cost: number
  time: string
}


const myReviewTheme = createTheme({
  palette:{
    text:{
      secondary:Colors.grey[600],
    }
  }
});
export default function Products() {
  const dispatch = useCustomDispatch();
  const [cartNumber,setCartNumber] = React.useState(0);
  const [currentImage,setImage] = React.useState(0);
  const [open,setOpen] = React.useState(false);
  const [initialButton,setInitialButton] = React.useState('');
  const [secondButton,setSecondButton] = React.useState('none');
  const [relatedProducts,setRelatedProducts] = React.useState([product,product,product,product,product]);
  const [loaderState,setLoader] = React.useState('none');
  const swiper = useSwiper();
  const addToCart = (n : number) => {
    setCartNumber(cartNumber + n);
     if(cartNumber > 0){
      setInitialButton('none');
      setSecondButton('flex');
      dispatch(add());
    } else {
      setInitialButton('');
      setSecondButton('none');
      
    }
  }
  const handleRating = (rating: number | any) => {
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
  const showSpec = (specs: Array<Object>) => {
    //let arr = Object()
  }
  const nextImage = () => {
    

  }
  const prevImage = () => {
    
  }
  const showRating = () => {
    
  }
  const fetchRelatedProducts = () => {
    //let data = product
    //data['name'] = 'Loading'
    //relatedProducts.push(data)
    //setRelatedProducts(relatedProducts);
    setLoader('block');
  }
  return (
    <React.Fragment>
    <Box sx={{color:'#000',mb:10}}>
    <Grid container spacing={2} >
      <Grid item xs={12} sm={6} >
      <Box>
      
        <Swiper
          modules={[Lazy,Pagination,EffectCreative]}
          slidesPerView={1}
          lazy={true}
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
          pagination={{ clickable: true }}
        >
        {product.photos.map((image,i)=>(
          <SwiperSlide>
          <img src={image} height={''} width={'100%'} />
          </SwiperSlide>
        ))}
        </Swiper> 
        <Box component='div' sx={{backgroundColor:'',width:{xs:'60%'},display:'flex',justifyContent:'space-between',m:'0 auto'}}>
        <Button sx={{backgroundColor:'rgba(0,0,0,0.3)',color:'white','&:hover':{backgroundColor:'rgba(0,0,0,0.1)'}}}  id='prevPhoto' onClick={prevImage}><i className='fal fa-chevron-left'/></Button>
        <Button sx={{backgroundColor:'rgba(0,0,0,0.3)',color:'white','&:hover':{backgroundColor:'rgba(0,0,0,0.1)'}}} onClick={() => swiper.slideNext()}><i className='fal fa-chevron-right' /></Button>
        </Box>
        </Box>
        <Box sx={{display:{xs:'none',sm:'block'},my:5}}>
            {product.photos.map((image,i)=>(
          
          <img src={image} height={'100px'} width={'100px'} />
          
        ))}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} >
      
        <Box sx={{display:'',width:'100%',justifyContent:'space-between'}}>
        
        <Typography textAlign='left'  color={Colors.blue[700]} variant='h5' fontWeight={'bold'} >
        {product.name}
        </Typography>
        <Typography sx={{display:'flex'}}>Rating: {handleRating(product.rating)}</Typography>
         <Typography variant='subtitle1' sx={{display:'flex',color:Colors.yellow[900],fontWeight:'bold',justifyContent:''}}>
                      {product.amount} <Typography sx={{fontWeight:'light',textDecoration:'line-through',color:Colors.grey[600],mt:1}}>{product.discount}</Typography>
                  </Typography>
        <Button fullWidth  sx={{backgroundColor:Colors.yellow[800],display:initialButton,'&:hover':{color:Colors.yellow[800]}}} onClick={() => addToCart(1)}>
        Add to Cart
        </Button>
        <Box sx={{display:secondButton,border:`1px solid ${Colors.yellow[800]}`,mx:1,borderRadius:'5px'}}>
        <Button  sx={{color:Colors.yellow[800],width:'10%',backgroundColor:Colors.common.white,'&:hover':{color:Colors.yellow[800]}}} onClick={ () => dispatch(remove())} >
        <i className='fad fa-minus' />
        </Button>
        <Typography fontWeight={'bold'} sx={{backgroundColor:Colors.yellow[800],color:Colors.common.white,width:'80%',py:1}}>
        {cartNumber}
        
        </Typography>
        <Button sx={{py:1,backgroundColor:Colors.common.white,width:'10%',color:Colors.yellow[800],'&:hover':{color:Colors.yellow[800]}}} onClick={ () => dispatch(add())} >
        <i className='fad fa-plus' />
        </Button>
        </Box>
        <Box>
          <Typography align='left' mt={2} variant='h6'>
          DESCRIPTION
         
          </Typography>
          <Typography variant='body1' align='center' mb={2}>
            Suscipitnovum vestibulum tellus vulputate eleifend fuisset solet simul quot lectus suas natoque nonumes theophrastus finibus.  Quidaminterdum vero mediocrem periculis verear indoctum maecenas nihil vidisse.  Venenatisquaerendum mutat ne harum.
          </Typography>
          <Accordion>
          <AccordionSummary  expandIcon={<i style={{color:Colors.common.white}}  className='fad fa-chevron-down' />}>
         <i style={{marginRight:10}} className='fa fa-sticky-note' /> specifications
          </AccordionSummary>
          <AccordionDetails>
            <Table sx={{width:'100%',minWidth:'xs'}}>
              <TableBody>
              {product.specifications.map((spec,i) => (
                <TableRow>
              
                <TableCell>
                
                  {Object.keys(product.specifications[i])}
                </TableCell>
                <TableCell>
                
                 {Object.values(product.specifications[i])}
                </TableCell>
               
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </AccordionDetails>
          </Accordion>
           <Accordion>
          <AccordionSummary  expandIcon={<i style={{color:Colors.common.white}} className='fad fa-chevron-down' />}>
          <i style={{marginRight:6}} className='fad fa-shipping-fast'/> Shipping
          </AccordionSummary>
          <AccordionDetails>
            <Table sx={{width:'100%',minWidth:'xs'}}>
              <TableBody>
              { 
              product.shipping.map((detail: any,i) => (
                <TableRow>
                <Tooltip title='Available locations or self pick up' >
                  <TableCell>
                  <i className='fal fa-city'/> {detail.location}
                </TableCell>
                </Tooltip>
                <Tooltip title='Shipping Cost' >
                <TableCell>
                  Cost: ${detail.cost}
                </TableCell>
                </Tooltip>
                <Tooltip title='Delievery in'>
                <TableCell>
                <i className='fal fa-clock'/> {detail.time}
                 
                </TableCell>
               </Tooltip>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </AccordionDetails>
          </Accordion>
           <Accordion>
          <AccordionSummary expandIcon={<i  style={{color:Colors.common.white}} className='fad fa-chevron-down' />}>
          <i style={{marginRight:10}} className='fad fa-flag' /> About
          </AccordionSummary>
          <AccordionDetails>
            {product.about}
          </AccordionDetails>
          </Accordion>
        </Box>
        </Box>
        
      </Grid>
      <Grid item xs={12} sm={6} lg='auto' >
        <Box sx={{width:'100%'}}>
        <Typography variant='h6' align='left' >
          Say something about the product...
        </Typography>
    
        <ThemeProvider theme={myReviewTheme}>
           <Box component='form' sx={{display:'flex',flexDirection:'column'}}>
            <TextField
          id="outlined-multiline-static"
          label="Your review goes here"
          multiline
          rows={3}
         variant='standard'
         
          sx={{width:'100%',borderRadius:'0px'}}
        />
        <input
  accept="image/*"
  style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
/>
<label htmlFor="raised-button-file">

  <Button size='small' startIcon={<i className='fal fa-camera' />}  sx={{position:{xs:'absolute',sm:'static'},mt:{xs:-5,sm:1},right:2,borderRadius:'0px',textTransform:'none',boxShadow:'none',backgroundColor:'',color:Colors.yellow[800],'&:hover':{backgroundColor:Colors.common.white,color:Colors.yellow[800],border:'none'},border:'none'}} variant="outlined" component="span">
    
  </Button>
</label> 
        <Button type='button' onClick={showRating}  sx={{backgroundColor:Colors.yellow[800],borderRadius:0,color:Colors.common.white,'&:hover':{backgroundColor:Colors.common.white,color:Colors.yellow[800]},p:1}}>
          <i className='fa fa-arrow-right' />
        </Button>
        </Box>
        <List sx={{width:'100%',}}>
        {[review,review].map((rv,i) => (
          <ListItem sx={{width:'100%',display:'block'}}>
          <ListItem>
          <img src={rv.profile} alt='Showing user profile image' width={50} height={50}/>
            <ListItemText sx={{width:{xs:'100%'}}} primary={rv.fullname}  secondary={rv.date}/>
            </ListItem>
            <ListItem>
            <ListItemText>
            {handleRating(rv.rating)}
            </ListItemText>
            </ListItem>
            <ListItem sx={{backgroundColor:Colors.grey[100],p:1,borderRadius:'10px'}}>
              {rv.comment}
            </ListItem>
          </ListItem>
        ))}
        <Button sx={{'& :hover':{backgroundColor:Colors.yellow[800]}}} startIcon={<i className='fal fa-chevron-down' />}>
        See more
        </Button>
        </List>
        </ThemeProvider>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant='h6' >
        You may also like
        </Typography>
        <Swiper
          slidesPerView={2}
          space-between={30}
          keyboard={{
            enabled:true,
          }}
          grid={{
            rows:2,
           
          }}
          onReachEnd={()=> fetchRelatedProducts()}
          lazy={true}
          grabCursor={true}
          navigation={true}
          modules={[MyGrid,Lazy,Keyboard,Navigation,Pagination]}
          className='custom-sx'
          style={{padding:'10px 0'}}
        >
          {relatedProducts.map((p,i)=> (
          <SwiperSlide style={{width:20,margin:'10px 10px', border:'0px solid #f6f6f6',borderRadius:'5px',boxShadow:'2px 2px 15px rgba(0,0,0,0.2)',paddingTop:'10px'}}  >
            <img className='swiper-lazy' src={p.photos[0]} width={150} height={'100%'} />
            
            <Typography>
            {p.name}
            </Typography>
            <Button fullWidth size={'large'} startIcon={<i className='fas fa-eye'/>} sx={{borderRadius:'0px 0px 5px 5px',textTransform:'none',boxShadow:'',backgroundColor:Colors.common.white,color:Colors.yellow[800],'&:hover':{border:'none',backgroundColor:Colors.yellow[800],color:`${Colors.common.white}`} }} >
            View
            </Button>
          </SwiperSlide>
        ))}
        <Box sx={{width:'100%',backgroundColor:'blue',display: loaderState}}>
        
        <LinearProgress color='error' />
        
        </Box>
        </Swiper>
        <Grid sx={{width:'100%',display:{xs:'none',sm:'block'}}} container spacing={0}>
        {[product,product,product,product].map((p,i)=> (
          <Grid item xs={6} sm={6}  sx={{border:'0px solid #b6b6b6',boxShadow:'5px 5px 5px rgba(217,217,217,0.4)',borderRadius:'10px',my:{xs:2,sm:0}}} >
            <img  src={p.photos[0]} height={130} width={150} style={{margin:'0px auto'}}/>
            <Typography>
            {p.name}
            </Typography>
            <Button size={'small'} fullWidth startIcon={<i className='fas fa-eye'/>} sx={{position:{xs:'static',sm:'static'},mt:{xs:-5,sm:1},right:2,borderRadius:'0px',textTransform:'none',boxShadow:'none',backgroundColor:Colors.yellow[800],color:Colors.common.white,'&:hover':{border:'none',backgroundColor:Colors.common.white,color:Colors.yellow[800]} }} >
            View
            </Button>
          </Grid>
        ))}
        </Grid>
      </Grid>
    </Grid>
    
    </Box>
    </React.Fragment>
    )
}