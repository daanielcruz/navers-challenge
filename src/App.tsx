import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Routes from './routes';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement="top-right"
      >
        <Routes />
      </ToastProvider>
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
