import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from '../assets/js/cookies.js'
interface CartItemType {
  count: number;
  product: string;
}
interface CartItemsType {
  count: number;
  products: CartItemType[];
}

const CartItems: CartItemsType = {
  count: 0,
  products: []
}

function addToCart(product_id:string,count:number){
  //@ts-ignore
  let user = JSON.parse(getCookie('belaiexpress'));
  return new Promise((resolve,reject) =>{
  if(user != null){
     axios.post('/api/cart',{userId:user.userId,count:count,productId:product_id})
          .then((response:any)=>{
            if(response.data.status){
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err: Error)=>{
            reject(false);
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
export const cartItems = createSlice({
  name: 'cart',
  initialState: {
    value:0,
    products: [],
    amount:0,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: (state) => {
      state.value -=1;
    },
    addByProduct:(state, action) => {
      
      if(state.products.length > 0){
        let cart = state.products.filter( product_id =>  product_id === action.payload);
        if(cart.length > 0) {
          //product already exists in the cart
        } else {
          //@ts-ignore
          state.products.push(action.payload);
          state.value += 1;
        }
      } else {
        //@ts-ignore
        state.products.push(action.payload);
        state.products.forEach((product,index) =>{
        });
        state.value +=1;
        
      }
    },
    removeByProduct: (state,action) => {
      state.products.forEach((product_id:string)=>{
        if(product_id === action.payload) {
          //@ts-ignore
          let index = state.products.indexOf(action.payload);
          delete state.products[index]
          state.value -=1;
        } else {
          
        }
      });
    },
    adjustAmount: (state,action) => {
       if(state.amount === 0) {
         let amount = parseInt(action.payload.split(' ')[1]);
         state.amount = amount;
       } else {
            let amount = parseInt(action.payload.split(' ')[1]);
         state.amount += amount;
       }
    }
  }
});

export const {add, remove,addByProduct,removeByProduct,adjustAmount} = cartItems.actions;
export default cartItems.reducer;