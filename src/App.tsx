import React from 'react';
//import logo from './logo.svg';

import './App.css';
//import './api/request.js';
import AppBar from './components/AppBar';
import BottomAppBar from './components/BottomAppBar';
import Cart from './components/Cart';
import Products from './components/Products';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import Dashboard from './components/Dashboard';
import Notification from './components/Notification';
import NotFound from './components/notFound';
import UserInfo from './components/UserInfo';
import SecurityPrivacy from './components/Security&Privacy';
import Test from './components/Test';
import * as Colors from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes as Switch, Route} from 'react-router-dom';
import {useCustomDispatch,useCustomSelector} from './states/hook';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
    text: {
      primary: string;
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    text?: {
      primary: string;
    }
  }
}



const theme = createTheme({
  palette: {
    mode: 'light',
    primary:{
      main:Colors.common.white,
    },
    text: {
      primary:Colors.blue[300],
      secondary: Colors.common.white,
    },
    secondary: {
      main:Colors.yellow[800],
    }
    
  }
});




function App() {
   const token = useCustomSelector((state) => state.user.value);
  
  return (
    <div className="App">
   
    <ThemeProvider theme={theme}>
    <AppBar />
    
      <Switch>
        <Route  path='/' element={<Home />} />
        <Route path='/product' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/test' element={<Test />} />
        <Route path='/dashboard' element={<Dashboard xs={12} sm={6}/>} />
        <Route path='/user-info' element={<UserInfo />} />
        <Route path='/security-privacy' element={<SecurityPrivacy />} />
        <Route path='/notifications' element={<Notification />} />
        
        <Route path='*' element={<NotFound/>} />
        
      </Switch>
      <BottomAppBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
