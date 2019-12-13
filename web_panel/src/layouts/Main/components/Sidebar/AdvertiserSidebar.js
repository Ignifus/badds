import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Sidebar from './Sidebar';

const pages = [
  {
    title: 'Dashboard',
    href: '/ads/advertisers',
    icon: <DashboardIcon />
  },
  {
    title: 'Ads',
    href: '/ads/advertisers/ads',
    icon: <ImageIcon />
  },
  {
    title: 'Market Place',
    href: '/ads/advertisers/market',
    icon: <ShoppingBasketIcon />
  },
  {
    title: 'contracts',
    href: '/adds/contracts',
    icon: <BusinessCenterIcon />
  },
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

const AdvertiserSidebar = props => {
  return <Sidebar pages={pages} {...props} />
};

export { AdvertiserSidebar };
