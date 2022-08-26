import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from '../assets/js/cookies.js'
export interface CartItemType {
  count: number;
  amount: number;
  productId: string;
}
interface CartItemsType {
  count: number;
  products: CartItemType[];
}

const CartItems: CartItemsType = {
  count: 0,
  products: []
}

export async function getFromCart(){
  //@ts-ignore
  let user = JSON.parse(getCookie('belaiexpress'));
  if(user != null) {
    return new Promise((resolve,reject)=>{
      //let window.location.search.split('')[1];
      axios.get('/api/v2/cart',{
      data:{userId:user.userId},
      headers:{
        'Authorization': `${user.userId}`,
      }
    })
    .then((response:any)=>{
      //alert(JSON.stringify(response));
       resolve(response.data);
    })
    .catch((err:Error)=>{
      //alert(JSON.stringify(err));
      reject(err);
    })
    });
  } else {
    
  }
}
  //@ts-ignore
const userGlobal = JSON.parse(getCookie('belaiexpress'));
function addToCart(product_id:string,count:number){
  //@ts-ignore
  let user = JSON.parse(getCookie('belaiexpress'));
  return new Promise((resolve,reject) =>{
  if(user != null){
     axios.post('/api/v2/cart',{userId:user.userId,count:count,productId:product_id})
          .then((response:any)=>{
            if(response.data.status){
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch((err: Error)=>{
            reject(err);
          });
  } else {
    if(localStorage['belaiexpress']){
      let myCart = JSON.parse(localStorage['belaiexpress']);
      myCart.push({count:count,productId:product_id});
      localStorage['belaiexpress'] = JSON.stringify(myCart);
    } else {
        let myCart = [{count:count,productId:product_id}];
        localStorage['belaiexpress'] = JSON.stringify(myCart);
    }
  }
});
}
export async function initCart(){
  let data = await getFromCart();
  return data;
}
var VALUE = 0;
var init_products: CartItemType[] = [];
function  counter() {
  getFromCart()
  .then((data:any)=>{
   init_products.push(data.cart);
   data.cart.forEach(function(product:CartItemType,index:number){
     VALUE += product.count;
   });
  })
  .catch((err:any)=>{
    alert(err)
  });
return VALUE;
}
interface Product  {
  name: string;
  amount: number;
  rating:number;
}
const sample: Product[] = [
  
  ]
const sample2: CartItemType[] = [
  
  ]
export const cartItems = createSlice({
  name: 'cart',
  initialState: {
    value: counter(),
    products: sample2,
    amount:0,
    myProducts: sample,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: (state) => {
      state.value -=1;
    },
    increment: (state, action)=>{
      if(state.products.length > 0){
        const item = state.products.filter((product)=> product.productId === action.payload.productId);
        if(item.length === 0) {
          state.products.push(action.payload.product);
          state.amount = action.payload.amount;
          state.value += action.payload.count;
        } else {
          //This means that the product is already in the cart list
        }
      } else {
          state.products.push(action.payload.product);
          state.value += action.payload.count;
      }
    },
    addByProduct:(state, action) => {
      
      if(state.products.length > 0){
        let cart = state.products.filter( product => product.productId === action.payload);
        if(cart.length > 0) {
          //product already exists in the cart
        } else {
          //@ts-ignore
          //state.products.push(action.payload);
          
          addToCart(action.payload,1)
          .then((response:any)=>{
             //state.products.push(action.payload.product);
            alert(JSON.stringify(response))
            state.value = response.cart.length;
            alert(response.cart.length);
          })
          .catch((err:Error)=>{
            alert(JSON.stringify(err))
          });
        }
      } else {
        //@ts-ignore
         /*addToCart(action.payload,1)
          .then((response:any)=>{
             //state.products.push(action.payload.product);
            alert('7777'+JSON.stringify(response))
            state.value = response.cart.length;
            state.products = response.products;
          })
          .catch((err:any)=>{
            alert('hhbbb'+JSON.stringify(err))
          });
        */
            axios.post('/api/v2/cart',{userId:userGlobal.userId,count:1,productId:action.payload})
          .then((response:any)=>{
            if(response.data.status){
              state.value = 5
              //state.products = response.cart;
              //state.myProducts = response.products
            } else {
              alert(response.data);
            }
          })
          .catch((err: Error)=>{
            alert(err);
          });
      }
    },
    removeByProduct: (state,action) => {
      state.products.forEach((product:CartItemType,index:number)=>{
        if(product.productId === action.payload) {
          //@ts-ignore
          let index = state.products.indexOf(action.payload);
          delete state.products[index]
          state.value -=1;
        } else {
          
        }
      });
    },
    adjustAmount: (state,action) => {
       /*if(state.amount === 0) {
         let amount = parseInt(action.payload.split(' ')[1]);
         
         state.amount += amount;
       } else {
            let amount = parseInt(action.payload.split(' ')[1]);
            
         state.amount += amount;
       }
       */
    },
    addProducts: (state,action) =>{
      state.myProducts = action.payload;
    }
  }
});

export const {add, remove,addByProduct,removeByProduct,adjustAmount, increment,addProducts} = cartItems.actions;
export default cartItems.reducer;