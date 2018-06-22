import React from 'react';
import {Card, CardDeck, CardBody, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';
import {connect} from "react-redux";
import SmartComponent, {mapDispatchToProps} from "../smart";

class Dashboard extends SmartComponent {
  fetch() {
    this.props.fetchData({
      url: "/ads/api/application-count/",
      respKey: "applications",
    }, "dash");
  }

  renderContent() {
    return (
      <Row>
        <Col>
          <CardDeck>
            <Card body inverse color="primary">
              <CardBody>
                <div className="h1 text-muted text-right mb-2"><i className="icon-people"/></div>
                <CardTitle>{this.props.state.data.applications.count}</CardTitle>
                <CardSubtitle>Aplicaciones</CardSubtitle>
              </CardBody>
            </Card>

            <Card body inverse color="info">
              <CardBody>
                <div className="h1 text-muted text-right mb-2"><i className="icon-paper-plane"/></div>
                <CardTitle>3</CardTitle>
                <CardSubtitle>Espacios</CardSubtitle>
              </CardBody>
            </Card>

            <Card body inverse color="warning">
              <CardBody>
                <div className="h1 text-muted text-right mb-2"><i className="icon-lock"/></div>
                <CardTitle>10</CardTitle>
                <CardSubtitle>Publicidades</CardSubtitle>
              </CardBody>
            </Card>

            <Card body inverse color="danger">
              <CardBody>
                <div className="h1 text-muted text-right mb-2"><i className="icon-eye"/></div>
                <CardTitle>5</CardTitle>
                <CardSubtitle>Contratos</CardSubtitle>
              </CardBody>
            </Card>
          </CardDeck>

        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state.base.dash
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
