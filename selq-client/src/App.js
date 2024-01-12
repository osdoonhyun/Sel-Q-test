import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FontSizingProvider from './context/FontSizingProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LayoutContainer from './components/layout/LayoutContainer';
import { GlobalFont } from './styles/GlobalFont';
import { store, persistor } from './store';

const client = new QueryClient();

function App() {
  return (
    <LayoutContainer>
      <FontSizingProvider>
        <QueryClientProvider client={client}>
          <CookiesProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_KEY}
                >
                  <GlobalFont />
                  <RouterProvider router={router} />
                </GoogleOAuthProvider>
              </PersistGate>
            </Provider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </CookiesProvider>
        </QueryClientProvider>
      </FontSizingProvider>
    </LayoutContainer>
  );
}

export default App;
