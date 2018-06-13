import React, {Component} from 'react'
import { ScaleLoader } from 'react-spinners';
import {Col, Row} from "reactstrap";
import Refresher from "../Refresher";

class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Row className="mt-2">
          <Col className="text-center">
            <ScaleLoader
              color={'#29363d'}
              loading={this.props.loading}
            />
          </Col>
        </Row>
        <Refresher refreshFunction={this.props.refreshFunction} refreshDate={this.props.refreshDate}/>
      </div>
    );
  }
}

export default Spinner;
