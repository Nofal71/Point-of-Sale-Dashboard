import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/Store/Store.js';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import AlertComponent from './Components/common/AlertComponent.jsx';
import { DashboardTheme } from './MUI_Theme/themeConfig.jsx';
import { ThemeProvider } from '@mui/material';
// import { Loader } from './Components/common/Loader.jsx';
import { useInfo } from './Hooks/useInfo.js';

const RootComponent = () => {
  const { theme } = useInfo(); 
  const selectedTheme = DashboardTheme(theme);

  return (
    <ThemeProvider theme={selectedTheme}>
      <AlertComponent />
      {/* <Loader /> */}
      <App />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  </StrictMode>
);
