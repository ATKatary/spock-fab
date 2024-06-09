import * as React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material';

import './index.css';
import Login from './pages/login';
import { THEME } from './constants';
import { useCustomState } from './utils';
import { LoadingContextType, NotificationContextType, NotificationType, loadingType } from './types';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const LoadingContext = React.createContext<LoadingContextType | null>(null);
export const NotificationContext = React.createContext<NotificationContextType>(null);

function App({...props}) {
  const [loading, setLoading] = useCustomState<loadingType>({});
  const [notification, setNotification] = useCustomState<NotificationType>({});
  const theme = createTheme({
    typography: {
      fontFamily: 'Helios Extended',
      body1: {
        color: THEME.TEXT
      }
    }
  })

  return (
    <LoadingContext.Provider value={{loading: loading, setLoading: setLoading}}>
      <NotificationContext.Provider value={{notification: notification, setNotification: setNotification}}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </NotificationContext.Provider>
    </LoadingContext.Provider>
  )
}

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
