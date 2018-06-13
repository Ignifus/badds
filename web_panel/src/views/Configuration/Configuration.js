import React, { Component } from 'react';

import { Card, CardText, CardBody, CardHeader } from 'reactstrap';

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Configuration extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader tag="h3"><i className="fa fa-newspaper-o"/> Notificacion de Panel</CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="notification" sm={12}>Notificacion Actual</Label>
                <Col sm={12}>
                  <Input name="notification" id="notification" value="Bienvenidos a nuestro sitio de Agenred." />
                  <FormText color="muted">
                    Esta es la notificacion mostrada actualmente.
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup check row>
                <Col sm={12}>
                  <Button color="primary"><i className="fa fa-edit"/> Modificar</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader tag="h3"><i className="fa fa-podcast"/> Video de Panel</CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="video" sm={12}>Video Actual</Label>
                <Col sm={12}>
                  <Input name="video" id="video" value="https://www.youtube.com/watch?v=VRiI9Scrto4" />
                  <FormText color="muted">
                    Este es el video mostrado actualmente.
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup check row>
                <Col sm={12}>
                  <Button color="primary"><i className="fa fa-edit"/> Modificar</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Configuration;
