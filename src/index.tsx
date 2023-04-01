import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './reduxStore/store';
import './assets/scss/style.min.css';

//
//if (process.env.NODE_ENV === 'production') {
   disableReactDevTools();
// }
const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
               <App />
            </QueryClientProvider>
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);

