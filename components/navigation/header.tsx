import { Fragment, useState } from 'react';
import {
  createStyles,
  Header,
  Menu,
  UnstyledButton,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
  Text,
  Avatar,
} from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconChevronDown,
  IconUser,
  IconCurrencyPound,
  IconFileInvoice,
  IconUsers,
} from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { HeaderProps } from '../../lib/interfaces';
import { useRouter } from 'next/router';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

export default function HeaderMenu({ links, isSignedIn }: HeaderProps) {
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('');
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, cx } = useStyles();

  const wideNavItems = links.map((linkWrapper) =>
    linkWrapper.linkList.map((link) => (
      <a
        key={link.label}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          setActive(link.link);
          router.push(link.link);
          close();
        }}
      >
        {link.label}
      </a>
    ))
  );

  // TODO Add links to the desktop version drop down menu when logged in
  // TODO Add icons to burger menu

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <a
          onClick={() => {
            router.push('/');
            setActive('');
          }}
        >
          <Title>Virtulum</Title>
        </a>
        {!isSignedIn ? (
          <Group spacing={5} className={classes.links}>
            {wideNavItems}
          </Group>
        ) : null}

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size='sm'
        />

        <Transition transition='slide-left' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {wideNavItems}
            </Paper>
          )}
        </Transition>
        {isSignedIn ? (
          <Menu
            width={260}
            position='bottom-end'
            transition='pop-top-right'
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar radius='xl' size='md' />
                  <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                    Ben Crow
                  </Text>
                  <IconChevronDown size={16} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {links.map((linkWrapper) => {
                return (
                  <Fragment>
                    <Menu.Label>{linkWrapper.category}</Menu.Label>
                    {linkWrapper.linkList.map((link) => {
                      return (
                        <Menu.Item icon={link.icon}>{link.label}</Menu.Item>
                      );
                    })}
                  </Fragment>
                );
              })}
              <Menu.Item icon={<IconLogout size={16} stroke={1.5} />}>
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconCurrencyPound size={16} stroke={1.5} />}>
                Donate
              </Menu.Item>
              <Menu.Item
                color='red'
                icon={<IconTrash size={16} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Container>
    </Header>
  );
}
