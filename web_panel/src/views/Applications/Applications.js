import React, { Component } from 'react';

import { Card, CardText, CardBody, CardHeader } from 'reactstrap';

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SmartComponent, {mapDispatchToProps} from "../smart";
import {connect} from "react-redux";

class Applications extends SmartComponent {
  fetch() {

  }

  renderContent() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader tag="h3"><i className="fa fa-newspaper-o"/> Example</CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="example" sm={12}>Example</Label>
                <Col sm={12}>
                  <Input name="example" id="example" value="Example" />
                  <FormText color="muted">
                    Example
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup check row>
                <Col sm={12}>
                  <Button color="primary"><i className="fa fa-edit"/> Example</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state.base.apps
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
