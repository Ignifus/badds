import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  Badge, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import NavLink from "react-router-dom/es/NavLink";

import avatar from '../../../public/img/avatars/1.jpg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOpen: false
    };

    this.notificationsToggle = this.notificationsToggle.bind(this);
  }

  notificationsToggle() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">

        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"/>
        </NavbarToggler>

        <NavbarBrand href="/ads/"/>

        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"/>
        </NavbarToggler>

        {/*<NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>*/}
        {/*<span className="navbar-toggler-icon"></span>*/}
        {/*</NavbarToggler>*/}
      </header>
    );
  }
}

export default Header;
