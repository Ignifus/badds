import React, { Component } from 'react';
import {Card, CardDeck, CardBody, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';
import Refresher from "../../components/Refresher";
import Spinner from "../../components/Spinner";
import {connect} from "react-redux";
import {fetchData} from "../../actions";
import Error from "../../components/Error";

class Dashboard extends Component {
  fetch() {
    // this.props.fetchData({
    //   url: "/api/agencies-count",
    //   respKey: "agencies",
    // }, "DASHBOARD");
  }

  componentDidMount() {
    this.fetch();
  }

  getRefresher() {
    return <Refresher refreshFunction={this.fetch.bind(this)} refreshDate={this.props.state.lastUpdated}/>;
  }

  render() {
    if (this.props.hasErrored) {
      return (
        <div>
          <Error hasErrored={this.props.hasErrored}/>
          {this.getRefresher()}
        </div>
      );
    }

    if (this.props.isLoading) {
      return <Spinner loading={true} refreshFunction={this.fetch.bind(this)} refreshDate={this.props.lastUpdated}/>
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <CardDeck>
              {/*<Card body inverse color="primary">*/}
                {/*<CardBody>*/}
                  {/*<div className="h1 text-muted text-right mb-2"><i className="icon-people"/></div>*/}
                  {/*<CardTitle>{this.props.state.agencies.count}</CardTitle>*/}
                  {/*<CardSubtitle>Agencias en linea</CardSubtitle>*/}
                {/*</CardBody>*/}
              {/*</Card>*/}

              {/*<Card body inverse color="info">*/}
                {/*<CardBody>*/}
                  {/*<div className="h1 text-muted text-right mb-2"><i className="icon-paper-plane"/></div>*/}
                  {/*<CardTitle>3</CardTitle>*/}
                  {/*<CardSubtitle>Sorteos en vivo</CardSubtitle>*/}
                {/*</CardBody>*/}
              {/*</Card>*/}

              {/*<Card body inverse color="warning">*/}
                {/*<CardBody>*/}
                  {/*<div className="h1 text-muted text-right mb-2"><i className="icon-lock"/></div>*/}
                  {/*<CardTitle>10</CardTitle>*/}
                  {/*<CardSubtitle>Tokens sin activar</CardSubtitle>*/}
                {/*</CardBody>*/}
              {/*</Card>*/}

              {/*<Card body inverse color="danger">*/}
                {/*<CardBody>*/}
                  {/*<div className="h1 text-muted text-right mb-2"><i className="icon-eye"/></div>*/}
                  {/*<CardTitle>5</CardTitle>*/}
                  {/*<CardSubtitle>Agencias morosas</CardSubtitle>*/}
                {/*</CardBody>*/}
              {/*</Card>*/}
            </CardDeck>

          </Col>
        </Row>

        {this.getRefresher()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state.base.dash
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (calls, section, sc) => dispatch(fetchData(calls, section, sc))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
