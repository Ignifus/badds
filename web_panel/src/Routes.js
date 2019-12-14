import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { AdvertiserLayout, PublisherLayout, Minimal as MinimalLayout } from './layouts';

import {
  Area as SelectArea,
  Dashboard as DashboardView,
  ProductList as ProductListView,
  ProductForm as ProductFormView,
  SpaceList as SpaceListView,
  SpaceForm as SpaceFormView,
  SpacesRestrictions as SpacesRestrictionsView,
  AdvertisementForm as AdvertisementFormView,
  AdvertisementList as AdvertisementListView,
  ResourceList as ResourceListView,
  ResourceForm as ResourceFormView,
  ResourceRestrictions as ResourceRestrictionsView,
  AuctionsList as AuctionsListView,
  AuctionsForm as AuctionsFormView,
  Market as MarketView,
  BiddingForm as BiddingFormView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={SelectArea}
        exact
        layout={MinimalLayout}
        path="/ads"
      />
      <Route path="/ads/publishers" component={PublishersRoutes} />
      <Route path="/ads/advertisers" component={AdvertiserRoutes} />
      {/* <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/ads/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/ads/sign-in"
      /> */}
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/ads/not-found"
      />
      <Redirect to="/ads/not-found" />
    </Switch>
  );
};

const AdvertiserRoutes = () => (
  <React.Fragment>
    <RouteWithLayout
          component={DashboardView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers"
    />
    <RouteWithLayout
          component={AdvertisementListView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/ads"
    />
    <RouteWithLayout
          component={AdvertisementFormView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/ads/add"
    />
    <RouteWithLayout
          component={AdvertisementFormView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/ads/update/:id"
    />
    <RouteWithLayout
          component={ResourceRestrictionsView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/ads/resources/:id/restrictions"
    />
    <RouteWithLayout
          component={ResourceListView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/ads/:id/resources"
    />
    <RouteWithLayout
          component={ResourceFormView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/ads/:id/resources/add"
    />
    <RouteWithLayout
          component={MarketView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/market"
    />
    <RouteWithLayout
          component={BiddingFormView}
          exact
          layout={AdvertiserLayout}
          path="/ads/advertisers/biddings/:auctionId"
    />
  </React.Fragment>
);


const PublishersRoutes = () => (
  <React.Fragment>
    <RouteWithLayout
      component={DashboardView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers"
    />
    <RouteWithLayout
      component={ProductListView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/products"
    />
    <RouteWithLayout
      component={ProductFormView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/products/add"
    />
    <RouteWithLayout
      component={ProductFormView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/products/update/:id"
    />
    <RouteWithLayout
      component={SpaceListView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces"
    />
    <RouteWithLayout
      component={SpaceFormView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces/add"
    />
    <RouteWithLayout
      component={SpaceFormView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces/update/:id"
    />
    <RouteWithLayout
      component={SpacesRestrictionsView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces/:id/restrictions"
    />
    <RouteWithLayout
      component={AuctionsListView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/auctions"
    />
    <RouteWithLayout
      component={AuctionsListView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces/:id/auctions"
    />
    <RouteWithLayout
      component={AuctionsFormView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces/:spaceId/auctions/add"
    />
    <RouteWithLayout
      component={AuctionsFormView}
      exact
      layout={PublisherLayout}
      path="/ads/publishers/spaces/:spaceId/auctions/update/:id"
    />
  </React.Fragment>
);

export default Routes;
