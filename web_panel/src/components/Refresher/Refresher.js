import React, {Component} from 'react'
import LastUpdated from "../../components/LastUpdated";
import {Col, Row} from "reactstrap";

class Refresher extends Component {
  render () {
    return (
      <Row className="mt-2">
        <Col className="text-center">
          <i className="fa fa-refresh fa-lg" onClick={this.props.refreshFunction} style={{cursor: 'pointer'}}/>
          <br/>
          <LastUpdated date={this.props.refreshDate}/>
        </Col>
      </Row>
    );
  }
}

export default Refresher;
