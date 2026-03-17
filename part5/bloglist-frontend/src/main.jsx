import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import App from './App'
import store from './store'

store.subscribe(() => console.log(store.getState()))

const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)