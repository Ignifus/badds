import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AppsIcon from '@material-ui/icons/Apps';
import ImageIcon from '@material-ui/icons/Image';
import TimerIcon from '@material-ui/icons/Timer';

import Sidebar from './Sidebar';

const pages = [
  {
    title: 'Dashboard',
    href: '/ads/publishers',
    icon: <DashboardIcon />
  },
  {
    title: 'Apps',
    href: '/ads/publishers/products',
    icon: <AppsIcon />
  },
  {
    title: 'Spaces',
    href: '/ads/publishers/spaces',
    icon: <ImageIcon />
  },
  {
    title: 'Subastas',
    href: '/ads/publishers/auctions',
    icon: <TimerIcon />
  },
  {
    title: 'Contratos',
    href: '/ads/publishers/contracts',
    icon: <BusinessCenterIcon />
  },
  // {
  //   title: 'Authentication',
  //   href: '/sign-in',
  //   icon: <LockOpenIcon />
  // },
  // {
  //   title: 'Typography',
  //   href: '/typography',
  //   icon: <TextFieldsIcon />
  // },
  // {
  //   title: 'Icons',
  //   href: '/icons',
  //   icon: <ImageIcon />
  // },
  // {
  //   title: 'Account',
  //   href: '/account',
  //   icon: <AccountBoxIcon />
  // },
  // {
  //   title: 'Settings',
  //   href: '/settings',
  //   icon: <SettingsIcon />
  // }
];

const PublisherSidebar = props => {
  return <Sidebar pages={pages} {...props} />
};

export { PublisherSidebar };
