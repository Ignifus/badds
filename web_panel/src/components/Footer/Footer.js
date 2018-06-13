import React, {Component} from 'react';
import {Col, Row} from "reactstrap";

class Footer extends Component {
  getVersion() {
    return VERSION;
  }

  render() {
    return (
      <footer className="app-footer">
        <span><a href="https://agenred.com">Badds</a> &copy; 2018</span>
        <span className="ml-auto">v{this.getVersion()}</span>
      </footer>
    )
  }
}

export default Footer;
