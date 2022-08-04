import { configureStore } from '@reduxjs/toolkit';
import cartItems from './cartItems';
import searchBar from './searchBar';
import filterDialog from './filterDialog';
import signUpStep from './signUp';
import user from './user';
const store = configureStore({
  reducer: {
    search: searchBar,
    cart: cartItems,
    filterDialog: filterDialog,
    signUpStep: signUpStep,
    user: user
  },
});
//const store = useStore(cartItems);
export {store}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
