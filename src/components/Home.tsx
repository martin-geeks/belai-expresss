import * as React from 'react';
import Grid from '@mui/material/Grid';
import MuiGrid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';
import * as Colors from '@mui/material/colors';
import {
  styled
} from '@mui/material/styles';
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SwappleIphoneXSilver from '../assets/images/swappie-iphone-x-silver.png';
import image from '../assets/images/clothing/image.jpg';
import image2 from '../assets/images/clothing/image2.jpg';
import image3 from '../assets/images/clothing/image3.jpg';
import { useCustomDispatch } from '../states/hook';
import {add,remove} from '../states/cartItems';
import  {Link} from 'react-router-dom';
import axios from 'axios';


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


interface Product {
    name: string;
    amount: string;
    rating: number;
    photo: string;
    model: string;
    brand: string;
    tags:Array<string>;
    category: Category;
    manufacturer: string;
    variants: Array<Object>;
    description: string
    discount: string;
    release: Date;
    expire: Date;
    addedDate: Date;
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
  release: new Date(),
  expire: new Date(),
  addedDate: new Date(),
  tags: ['iphone','mobile'],
  category:{category:'Accessories',subcategory:'Mobile'}
}
var products = new Array();
for(let i=1; i<=10; i++){
  products.push(product);
}
/*//products[3] = {
  name: 'Spac Zed Grey',
  amount: 'ZMW 500',
  rating: 2,
  photo:image,
  model: 'Leather 4 CAT',
  brand: 'Batter',
  manufacturer: 'Batter Shoe Company',
  variants: [{}],
  description: 'Data Type',
  discount: 'K105'
}
//products[2] = {
  name: 'Yonik ',
  amount: 'ZMW 150',
  rating: 3,
  photo:image2,
  model: 'Lik 4 CAT',
  brand: 'Batter',
  manufacturer: 'Batter Shoe Company',
  variants: [{}],
  description: 'Data Type',
  discount: 'K75'
}
//products[7] = {
  name: 'Sapra Unik ',
  amount: 'ZMW 78.00',
  rating: 3,
  photo:image3,
  model: 'Lik 4 CAT',
  brand: 'Batter',
  manufacturer: 'Batter Shoe Company',
  variants: [{}],
  description: 'Data Type',
  discount: 'K5'
}*/
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
        {[1,2,3,4,5,7,8,9].map((n,i)=> (
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

function Home() {
  const dispatch = useCustomDispatch();
  const [value,
    setValue] = React.useState(0);
  const [products, setProducts]= React.useState<Product[]>([]);
  const [loading,setLoading] = React.useState(true);
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
      axios.get<Product[]>('/products')
      .then(response => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch(err => {
        setLoading(true);
        alert(err)
      })
    },[]);
  return (
    <React.Fragment>
      <Grid container spacing={4} sx={{position:'static'}}>
        <Grid item xs={12} sm={3}>
        <ThemeProvider theme={TabsTheme}>
       
        <Box>
          <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
      sx={ { padding: '10px' }}
      >
  <Tab label="All" />
  <Tab label="Technology" />
  <Tab label="Clothing" />
  <Tab label="Food" />
  <Tab label="Household" />
    </Tabs>
   
          <Box sx={{display:{xs:'none',sm:'block'}}}>
    <Typography
              variant='h5'
            >
            Categories
          </Typography>
          <Box sx={{width:'100%',backgroundColor:'#f6f6f6', height:300,m:2,borderRadius:'10px',display:{xs:'block',sm:''}}}>
            <CategoriesDesk />
          </Box>
          <Typography
              variant='h5'
            >
            
          </Typography>
            <Box sx={{width:'100%',backgroundColor:'#f6f6f6', height:300,m:2,borderRadius:'10px',display:{xs:'none',sm:'none'}}}>
            <CategoriesDesk />
          </Box>
          </Box>
        </Box>
        </ThemeProvider>
        </Grid>
         <Grid item xs={12} sm={9} sx={{overflow:'scroll',maxHeight:{sm:400},mt:{sm:10}}} >
           <ThemeProvider theme={TabsTheme} >
           <Box>
            {loading? <Loading />: 
            <Grid container spacing={2}>
              {products.map((item,i)=>(
             
              <GridProduct item xs={6} sm={3} >
                  <Box sx={{position:'',display:'flex',justifyContent:'space-between',width:'100%'}}>
                  <Button size='small' disableElevation={true} disableFocusRipple={true} sx={{backgroundColor:Colors.blue[800],color:Colors.common.white,mb:1,fontSize:'7pt',borderRadius:0,'&:hover':{color:Colors.blue[800],boxShadow:'1px 1px 5px rgba(0,0,0,0.1)'}}}>20<i className='fal fa-percent' /></Button>
                  <IconButton aria-label='Add to wishlist'>
                    
                    <i className='fal fa-bookmark'  />
                    
                  </IconButton>
                  </Box>
                  <CardMedia component='img' src={item.photo} alt='Photo of an iPhone X'      width={'150px'}    height={'150px'}/>
                  <Typography variant='body1'>
                   <Typography sx={{color:Colors.blue[800],fontWeight:'bold',textAlign:'left' ,textTransform:'none'}}  component={Link} to='/product'>
                    {item.name}
                  </Typography>
                  {handleRating(item.rating)}
                    <Typography variant='subtitle1' sx={{display:'flex',color:Colors.yellow[900],fontWeight:'bold',justifyContent:'space-around'}}>
                      {item.amount} <Typography sx={{fontWeight:'light',textDecoration:'line-through',color:Colors.grey[600],mt:1}}>{item.discount}</Typography>
                    </Typography>
                    <Typography variant='subtitle2' sx={{display:'inline'}}>
                       <i className='fal fa-dash' />
                       
                    </Typography>
                    
                  </Typography>
                  
                  <Button
                     disableFocusRipple
                      disableElevation
                     sx={{color:Colors.common.white,boxShadow:'none',borderRadius:'50%', height:'30px', width:'30px'}} 
                     variant='contained' 
                     onClick={()=>dispatch(add())}>+</Button>
              </GridProduct>
              ))}
             
              
            </Grid>
            }
           </Box>
           
           </ThemeProvider>
         </Grid>
         <ThemeProvider theme={TabsTheme}>
          <Grid item xs={12} sm={3}>
        <ThemeProvider theme={TabsTheme}>
       
        <Box>
          <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
      sx={ { padding: '10px',display:'none' }}
      >
  <Tab label="All" />
  <Tab label="Technology" />
  <Tab label="Clothing" />
  <Tab label="Food" />
  <Tab label="Household" />
    </Tabs>
    <Box sx={{p:1,backgroundColor:Colors.yellow[800],width:340,display:{xs:'flex',sm:'none'},justifyContent:'space-between'}}><Typography variant='h6' sx={{textAlign:'left',color:Colors.common.white}}><i className='fal fa-books' /> Stationary</Typography></Box>
    
          <Box sx={{display:{xs:'none',sm:'block'}}}>
    <Typography
              variant='h5'
            >
            More 
          </Typography>
          <Box sx={{width:'100%',backgroundColor:'#f6f6f6', height:300,m:2,borderRadius:'10px',display:{xs:'none',sm:'none'}}}>
            <CategoriesDesk />
          </Box>
          
            <Box sx={{width:'100%',backgroundColor:'#f6f6f6', height:300,m:2,borderRadius:'10px',display:{xs:'block',sm:''}}}>
            <CategoriesDesk />
          </Box>
          </Box>
        </Box>
        </ThemeProvider>
        </Grid>
        <Grid item xs={12} sm={9} sx={{overflow:'scroll',maxHeight:{sm:400},mt:{sm:10}}}>
        <Box>
           { loading? <Loading />:
            <Grid container spacing={2}>
              {products.map((item,i)=>(
              
              <GridProduct item xs={6} sm={3} >
                  <Box sx={{position:'',display:'flex',justifyContent:'space-between',width:'100%'}}>
                  <Button size='small' disableElevation={true} disableFocusRipple={true} sx={{backgroundColor:Colors.blue[800],color:Colors.common.white,mb:1,fontSize:'7pt',borderRadius:0,'&:hover':{color:Colors.blue[800],boxShadow:'1px 1px 5px rgba(0,0,0,0.1)'}}}>20<i className='fal fa-percent' /></Button>
                  <IconButton aria-label='Add to wishlist'>
                    
                    <i className='fal fa-bookmark'  />
                    
                  </IconButton>
                  </Box>
                  <CardMedia component='img' src={item.photo} alt='Photo of an iPhone X'  height={150}/>
                  <Typography variant='body1'>
                   <Typography sx={{color:Colors.blue[800],fontWeight:'bold',textAlign:'left'}} component={Link} to='/product'>
                    {item.name}
                  </Typography>
                  {handleRating(item.rating)}
                    <Typography variant='subtitle1' sx={{display:'flex',color:Colors.yellow[900],fontWeight:'bold',justifyContent:'space-around'}}>
                      {item.amount} <Typography sx={{fontWeight:'light',textDecoration:'line-through',color:Colors.grey[600],mt:1}}>{item.discount}</Typography>
                    </Typography>
                    <Typography variant='subtitle2' sx={{display:'inline'}}>
                       <i className='fal fa-dash' />
                       
                    </Typography>
                    
                  </Typography>
                  
                  <Button disableFocusRipple disableElevation sx={{color:Colors.common.white,boxShadow:'none',borderRadius:0}} variant='contained'>Add to Cart</Button>
              </GridProduct>
              ))}
             
              
            </Grid>
            }
           </Box>
        </Grid>
         </ThemeProvider>
      </Grid>
    </React.Fragment>
  );
}
export default Home;