import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Badge, Col, Container, Row} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Advertisements from '../../views/Advertisements/';
import Applications from '../../views/Applications/';
import Wiki from '../../views/Wiki/';
import {ScaleLoader} from "react-spinners";
import {connect} from "react-redux";
import {fetchData} from "../../actions/index";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Toast from "../../components/Toast";

class Full extends Component {
  componentDidMount() {
    this.props.fetchData({
      url: "/ads/api/users",
      respKey: "user"
    }, "site");
  }

  render() {
    if (this.props.state.hasErrored) {
      return (
        <Container className="center-absolute">
          <ErrorMessage hasErrored={this.props.state.hasErrored}/>
        </Container>
      );
    }

    if (this.props.state.isLoading) {
      return (<Container className="center-absolute">
        <div className="inner-center-absolute text-center" >
          <ScaleLoader color={'#29363d'} height={100} width={12} loading={true}/>
        </div>
      </Container>);
    }

    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Panel" component={Dashboard}/>
                <Route path="/applications" name="Mis Aplicaciones" component={Applications}/>
                <Route path="/advertisements" name="Mis Publicidades" component={Advertisements}/>
                <Route path="/wiki" name="Preguntas" component={Wiki}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>

            <br/>

            <Row className="mt-2">
              <Col className="text-center">
                <Badge pill className="font-sm" color="info"><small className="text-muted">{this.props.state.data.user[0].username}</small></Badge>
              </Col>
            </Row>

            <br/>

          </main>

          {/*<Aside />*/}
        </div>
        <Footer />
        <Toast/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.base.site
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (calls, section) => dispatch(fetchData(calls, section))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Full);
