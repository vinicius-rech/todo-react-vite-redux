import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"
import {lightTheme} from "./themes/light";
import {Provider} from 'react-redux';
import store from "./store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<React.StrictMode>
  <ThemeProvider theme={lightTheme}>
    <CssBaseline/>
    <Provider store={store}>
      <App/>
    </Provider>
  </ThemeProvider>
</React.StrictMode>)
