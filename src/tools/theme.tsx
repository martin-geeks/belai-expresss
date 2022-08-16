import {styled,createTheme,ThemeProvider} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
export const main = createTheme({
  palette:{
    primary: {
      main:Colors.yellow[800],
    },
    text :{
      primary:Colors.common.black,
      secondary: Colors.grey[500],
    },
    error:{
      main:Colors.red[800]
    },
  }
});