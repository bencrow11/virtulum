import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import HeaderMenu from '../components/navigation/header';
import {
  IconFileInvoice,
  IconUser,
  IconUsers,
  IconSettings,
} from '@tabler/icons';

function MyApp({ Component, pageProps }: AppProps) {
  // TODO Edit isSignedIn in HeaderMenu prop to represent the user being authenticated
  const isAuthenticated = true;

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: 'light',
        cursorType: 'pointer',
        dateFormat: 'DD/MM/YYYY',
        primaryColor: 'gray',
      }}
    >
      <HeaderMenu
        links={
          isAuthenticated
            ? [
                {
                  category: '',
                  linkList: [
                    {
                      link: '/account/invoice',
                      label: 'Invoices',
                      icon: (
                        <IconFileInvoice
                          size={16}
                          strokeWidth={1.5}
                          color={'black'}
                        />
                      ),
                    },
                    {
                      link: '/account/customer',
                      label: 'Customers',
                      icon: <IconUsers size={16} stroke={1.5} />,
                    },
                  ],
                },
                {
                  category: 'Settings',
                  linkList: [
                    {
                      link: '/account/profile',
                      label: 'Profile Settings',
                      icon: <IconUser size={16} stroke={1.5} />,
                    },
                    {
                      link: '/account/settings',
                      label: 'Account Settings',
                      icon: <IconSettings size={16} stroke={1.5} />,
                    },
                  ],
                },
              ]
            : [
                {
                  category: 'Settings',
                  linkList: [
                    {
                      link: '/signin',
                      label: 'Sign In',
                      icon: <IconUser size={16} stroke={1.5} />,
                    },
                    {
                      link: '/login',
                      label: 'Log In',
                      icon: <IconSettings size={16} stroke={1.5} />,
                    },
                  ],
                },
              ]
        }
        isSignedIn={isAuthenticated}
      />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
