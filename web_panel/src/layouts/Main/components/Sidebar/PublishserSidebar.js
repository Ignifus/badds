import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AppsIcon from '@material-ui/icons/Apps';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Sidebar from './Sidebar';

const pages = [
  {
    title: 'Dashboard',
    href: '/adds/publishers',
    icon: <DashboardIcon />
  },
  {
    title: 'Apps',
    href: '/adds/apps',
    icon: <AppsIcon />
  },
  {
    title: 'Contracts',
    href: '/contracts',
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
