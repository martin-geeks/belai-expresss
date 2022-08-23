import * as React from 'react';
import Grid from '@mui/material/Grid';
import MuiGrid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';
import Fab from '@mui/material/Fab';
import LinearProgress from '@mui/material/LinearProgress';
import * as Colors from '@mui/material/colors';
import {
  styled
} from '@mui/material/styles';
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {main as mainTheme} from '../tools/theme';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SwappleIphoneXSilver from '../assets/images/swappie-iphone-x-silver.png';
import image from '../assets/images/clothing/image.jpg';
import image2 from '../assets/images/clothing/image2.jpg';
import image3 from '../assets/images/clothing/image3.jpg';
import { useCustomDispatch,useCustomSelector } from '../states/hook';
import {add,remove,addByProduct,removeByProduct,adjustAmount} from '../states/cartItems';
import  {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react';
import {Grid as MyGrid,Keyboard,Lazy,Pagination,Navigation,EffectCreative} from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const TabsTheme = createTheme({
  palette: {
    primary: {
      main: Colors.yellow[800],
    },
    secondary: {
      main: Colors.yellow[800],

    }

  },
});

const CategoriesDesk = () => (
 <Box sx={{display:'flex',flexDirection:'column',flexGlow:1,justifyContent:'space-between',height:300}}>
          <Button sx={ { p:'10px',color: '#000' }}>
            <Typography>
              All
            </Typography>
          </Button>
          <Button sx={ { color: '#000' }}>
            <Typography>
              Clothing
            </Typography>
          </Button>
          <Button sx={ { color: '#000' }}>
            <Typography>
              Technology
            </Typography>
          </Button>
          <Button sx={ { color: '#000' }}>
            <Typography>
              Household
            </Typography>
          </Button>
          <Button sx={ { color: '#000' }}>
            <Typography>
              Food
            </Typography>
          </Button>
        </Box>
);
const Button = styled(MuiButton)(({
  theme
}) => ({
  textTransform: 'none',
  backgroundColor: '',
}));
const Tab = styled(MuiTab)(({
  theme
}) => ({
  main: 'red',
  textTransform: 'none',
  backgroundColor: '',
}));

export type TypeCategory = 'Accessories' | 'Clothing' | 'Food' | 'Misc'
export type TypeSubCategory = | 'Kids' | 'Adult' | 'Male' | 'Female'| 'Mobile' | 'Desktop' | 'Laptop' | 'Variety'
interface Category {
  category: TypeCategory;
  subcategory: TypeSubCategory;
}
interface Shipping {
  cost: number;
  location: string;
  time: string;
}

interface Product {
    name: string;
    amount: string;
    rating: number;
    category : Category;
    photos: Array<string>;
    model: string;
    brand: string;
    manufacturer: string;
    tags : string[];
    availability:boolean;
    delivery:boolean;
    locations:string[];
    product_id: string;
    variants: Array<Object>;
    description: string;
    shipping: Shipping[];
    specifications: object[];
    about: string;
    discount: string;
    release: Date;
    expire: Date;
    updatedAt: Date;
    addedDate: Date;
}
interface TypeTwoCategory {
  technology: Product[];
  clothing: Product[];
  accessories: Product[];
  food: Product;
  misc: Product;
}
interface AllProduct {
  category: TypeTwoCategory;
}

const GridProduct = styled(MuiGrid)(({theme}) =>({
  border:`0.5px solid ${Colors.grey[300]}`,
  boxShadow:'1px 1px 1px rgba(0,0,0,0.1)',
  padding:'2px',
  borderRadius:'5px',
  transform:'scale(-2px)'
}));

function Loading() {
  
  return (
    <Box sx={{width:'100%'}}>
      <Grid container spacing={2} >
        {[1,2,3,4].map((n,i)=> (
        <Grid item xs={6} sm={3}  sx={{overflow:'scroll',maxHeight:{sm:400},mt:{sm:10}}} >
        <Skeleton variant='rectangular' animation='wave' height='150px' width='150px' sx={{borderRadius:'5px'}}>
        </Skeleton>
        <Skeleton variant='rectangular' width='150px' sx={{my:1,borderRadius:'5px'}} height='10px' animation='wave' >
        </Skeleton>
        <Skeleton variant='rectangular' animation='wave' sx={{borderRadius:'5px'}} width='70px' height='10px' >
        </Skeleton>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Skeleton variant='rectangular' animation='wave' sx={{borderRadius:'5px',my:1}} height='10px' width='100px' >
        </Skeleton>
        <Skeleton variant='rectangular' animation='wave' sx={{borderRadius:'5px',my:1}} height='10px' width='40px' >
        </Skeleton>
        </Box>
        </Grid>
        ))}
      </Grid>
    </Box>
    );
}
const theme2 = createTheme({
  palette:{
    primary:{
      main:Colors.yellow[800],
    }
  }
});
type PropsCategory = 'technology' | 'clothing' | 'food' | 'household' | 'misc';
interface PropType {
  heading: string;
  products: AllProduct;
  category: PropsCategory;
}
function ProductViewMobile(props: PropType) {
    const [navigate,setNavigate] =  React.useState(false);
    const [currentId,setCurrentId] = React.useState<string>('');
    const dispatch = useCustomDispatch();
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
    const myCart = useCustomSelector((state) => state.cart.products);
    const checkCart = (id: string,amount:string) => {
    
    let cart = myCart.filter( product_id =>  product_id === id);
    if(cart.length > 0) {
     
      return true;
    } else {
      dispatch(adjustAmount(amount));
      return false;
    }
    
  }
    const selectProduct = (product_id: string) => {
    setNavigate(true);
    setCurrentId(product_id);
    /*setTimeout(function (){
      setNavigate(false);
    },100);*/
  }
  return (
      <Box sx={{width:'100%'}}>
       {navigate? <Navigate  to={'/product?product_id='+currentId} state={{product_id:currentId}} />: ''}
              <Button sx={{display:'flex',borderRadius:'0px',justifyContent:'space-between',mx:4}} endIcon={<i className='fal fa-arrow-right' />} fullWidth color='warning' >
                {props.heading}
              </Button>
                   <Swiper
          slidesPerView={2}
          space-between={30}
          keyboard={{
            enabled:true,
          }}
          grid={{
            rows:2,
           
          }}
          
          lazy={true}
          grabCursor={true}
          navigation={false}
          modules={[MyGrid,Lazy,Keyboard,Navigation,Pagination]}
          
          style={{padding:'10px 0'}}
        >
                    
        {/*@ts-ignore */}
          {props.products.category.technology.map((p,i)=> (
          <SwiperSlide style={{border:'1px solid #f0f0f0f0',borderRadius:'10px',padding:'10px',margin:'0px 10px'}}>
          <div className='' >
           
             <Button  sx={{backgroundColor:Colors.red[600],borderRadius:'5px 5px 0px 0px',width:'100%','&:hover':{color:Colors.red[800],backgroundColor:Colors.common.white}}}>
            {p.discount} <i className='fal fa-off' /> ~OFF
            </Button>
            <img src={SwappleIphoneXSilver} width='90%' height="200px"/>
              <Typography textAlign={'left'}>
              {p.name}
            </Typography>
            <Typography fontWeight={'bold'}  textAlign={'left'} >
              {p.amount}
            </Typography>
            <Typography >
              {handleRating(p.rating)}
            </Typography>
            <Box>
            {checkCart(p.product_id,p.amount)? <Fab onClick={() => dispatch(removeByProduct(p.product_id))}  sx={{boxShadow:'none'}} variant="circular" size='medium' color={'warning'}><i className='fad fa-minus' /></Fab>:<Fab sx={{boxShadow:'none'}} onClick={() => dispatch(addByProduct(p.product_id))}  variant="circular" size='medium' color={'warning'}><i className='fad fa-cart-plus' /></Fab>}
            <Button color='warning'>
              Add wishlist
            </Button>
            <Fab sx={{boxShadow:'none'}} onClick={() => selectProduct(p.product_id) } variant="circular" size='small' color={'warning'}>
              <i className='fad fa-eye' />
            </Fab>
            </Box>
          </div>
          </SwiperSlide>
        ))}
        <Box sx={{width:'100%',backgroundColor:'blue',display:'block'}}>
        
     
        
        </Box>
        </Swiper>
        </Box>
    );
}
function Home() {
  const dispatch = useCustomDispatch();
  const [value,
    setValue] = React.useState(0);
  const [categoryOrder,setCartegoryOrder]  = React.useState<string[]>(['Accessories','Clothing','Household','Food','misc']);
  const [products, setProducts]= React.useState<AllProduct>();
  const [loading,setLoading] = React.useState<boolean>(true);
  const [errorState,setError] = React.useState <boolean>(false);
  const [navigate,setNavigate] =  React.useState(false);
  const [currentId,setCurrentId] = React.useState<string>('');
  const [layout,setLayout] = React.useState<any[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
  const [responseMessage,setResponseMessage] = React.useState<string>('Network Error, Try Again');
  const [refresh,setRefresh] = React.useState<boolean>(false);
   const refreshProduct = () => {
    refresh? setRefresh(false): setRefresh(true);
  }
  React.useEffect(()=>{
      let data = new FormData();
      data.set('ux-key','jshsbshzkzjs')
      /*axios.get('/products')
      .then((products : Product )=> {
        alert(products)
      })
      .catch((err : Error )=> {
        alert(err)
      });*/
      axios.get<AllProduct>('/products')
      .then(response => {
        //alert(JSON.stringify(response));
        setLoading(false);
        setProducts(response.data);
        setError(false);
        
      })
      .catch(err => {
        setLoading(true);
        setError(true);
        setResponseMessage('Could\'nt connect to the server.');
       
      })
    },[refresh]);
  const selectProduct = (product_id: string,amount:string) => {
    setNavigate(true);
    setCurrentId(product_id);
    /*setTimeout(function (){
      setNavigate(false);
    },100);*/
  }
  const myCart = useCustomSelector((state) => state.cart.products);
  const checkCart = (id: string) => {
    
    let cart = myCart.filter( product_id =>  product_id === id);
    if(cart.length > 0) {
     
      return true;
    } else {
      //dispatch(adjustAmount(amount))
      return false;
    }
    
  }
  const renderOrdered = () =>{
    let data = new Array();
    axios.get('/api/arrangement')
    .then((response:any)=>{
      let resp = response.data;
      let defaultOrder = ['Accessories','Clothing','Food','Misc']
      if(resp.status) {
        if(resp.arrangement.length > 0) setCartegoryOrder(resp.arrangement)
        if(resp.arrangement === 0) setCartegoryOrder(defaultOrder);
      } else {
          setCartegoryOrder(defaultOrder);
      }
    })
    .catch((err:Error) =>{
      console.log(err);
    });
    categoryOrder.map((category,index)=>{
      //@ts-ignore
      for(let p in products.category ){
        
        
        if(category === p) {
          data.push(p);
          setLayout(data);
        } else {
          //defaults to normal
          //The category the  follows: Technology, Clothing,food etc
        }
      }
    });
  }
  return (
    <React.Fragment>
    
      <Grid container spacing={4} sx={{position:'static'}}>
      
        <Grid item xs={12} sm={3}>
        <ThemeProvider theme={TabsTheme}>
       
        <Box sx={{display:{xs:'block',sm:'none'}}}>
   <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="Find what you are looking quickly"
      sx={ { padding: '0px' }}
      >
  <Tab label="All" />
  <Tab label="Technology" />
  <Tab label="Clothing" />
  <Tab label="Food" />
  <Tab label="Household" />
    </Tabs>
  </Box>
        </ThemeProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
      
        <ThemeProvider theme={theme2} >
      <Collapse in={errorState} >
            <Alert color='error' icon={<i className='fal fa-globe' />} >{responseMessage} <Button sx={{textTransform:'none',textDecoration:'underline'}} onClick={refreshProduct}><i className='fal fa-sync' />  Retry</Button></Alert> 
            
    </Collapse>
    </ThemeProvider>
    
      </Grid>
         <Grid item xs={12} sm={3} sx={{display:{xs:'none',sm:'grid'}}} >
         <ThemeProvider theme={TabsTheme} >
         <Typography variant='h5'>
          Category
         </Typography>
   <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="Find what you are looking quickly"
      orientation='vertical'
      sx={ { padding: '0px' }}
      >
  <Tab label="All" />
  <Tab label="Technology" />
  <Tab label="Clothing" />
  <Tab label="Food" />
  <Tab label="Household" />
    </Tabs>
    </ThemeProvider>
          
         </Grid>
         <Grid item xs={12} sm={9} sx={{overflow:'scroll',maxHeight:{sm:400}}} >
           <Box>
         
            {loading? <Loading />: 
            <Grid container spacing={2} sx={{mb:10}}>
             {/*@ts-ignore*/}
          <ProductViewMobile heading={'Technology'} products={products}  category={'technology'} />
          {/*@ts-ignore*/}
         <ProductViewMobile heading={'Foods'} products={products}  category={'foods'} />
          {/*@ts-ignore*/}
         <ProductViewMobile heading={'Household'} category={'household'} products={products}  />
          {/*@ts-ignore*/}
          <ProductViewMobile heading={'Misc - Variety Items'} products={products}  category={'foods'} />
          <Grid item xs={12} sm={6} >
          <ThemeProvider theme={mainTheme} >
             <Box sx={{width:'100%',backgroundColor:'primary.main'}}>
            <Typography>
            
            </Typography>
            <Typography variant='h4' sx={{color:'#fff',fontWeight:'bold'}}>
              <i style={{position:'absolute',fontSize:'1em', display:'block'}} className='fab fa-cc-visa' />
                   <i style={{fontSize:'1em', marginTop:'0px',marginRight:'0px',color:'white',transform:'rotate(70deg)'}}className='fad fa-headphones' />
              <i className='fal fa-shopping-bag' style={{margin:'0px 20px'}} />
              <p style={{display:'inline', fontSize:'2em'}} >
              <svg xmlns="http://www.w3.org/2000/svg" width='400' height='30' viewBox="0 0 700 72" >
                <text style={{fill:Colors.yellow[800],stroke:'#fff',strokeWidth: 2.5}} x="160" y="50">Belai Express</text>
              </svg>
              </p>
              
            </Typography>
             <i style={{position:'absolute',fontSize:'1em', marginTop:'-80px',marginRight:'50px',color:'white',transform:'rotate(70deg)'}}className='fab fa-cc-paypal' />
            <Typography variant='subtitle1' sx={{color:'#fff',fontWeight:'bold'}}>
            <i style={{position:'absolute',fontSize:'2em',display:'block',transform:'rotate(45deg)'}}className='fad fa-shopping-cart' />
              Subscribe to our newsletter
            <i style={{position:'absolute',fontSize:'2em'}}className='fad fa-store' />
              <i style={{position:'absolute',fontSize:'2em', marginTop:'-80px',marginRight:'50px',color:'white',transform:'rotate(70deg)'}}className='fab fa-google-pay' />
                <i style={{position:'absolute',fontSize:'2em', marginTop:'-130px',marginRight:'2px',color:'white',transform:'rotate(70deg)'}}className='fad fa-tshirt' />
            </Typography>
            <Box component='form' sx={{display:'flex',mx:1}} >
                      <TextField
              margin="normal"
              required
              variant='outlined'
              id="email"
              placeholder='Your email address'
              name="email"
              autoComplete="email"
              
              size='small'
              error={false}
              sx={{width:'80%',backgroundColor:'#fff',border:'none',borderRadius:'0px'}}
            />
            <Button sx={{color:'#fff'}}>
            <i className='fal fa-arrow-right' />
            </Button>
            </Box>
            </Box>
          </ThemeProvider>
          </Grid>
        </Grid>
            
            }
            
           </Box>
           
         
         </Grid>

      </Grid>
      
    </React.Fragment>
  );
}
export default Home;