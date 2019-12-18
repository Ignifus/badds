import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ImageIcon from '@material-ui/icons/Image';
import Timer10Icon from '@material-ui/icons/Timer10';

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
    title: 'Biddings',
    href: '/ads/advertisers/biddings',
    icon: <Timer10Icon />
  },
  {
    title: 'Contratos',
    href: '/ads/advertisers/contracts',
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
