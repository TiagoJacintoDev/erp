import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SignupPage } from './pages/signup/signup.page';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);

const theme = createTheme({
  cursorType: 'pointer',
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
);
