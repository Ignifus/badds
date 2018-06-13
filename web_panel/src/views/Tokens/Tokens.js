import React, { Component } from 'react';

import { Card, CardText, CardBody, CardHeader } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import ReactTable from "react-table";
import "react-table/react-table.css";

import {fetchData, postData} from "../../actions";
import {connect} from "react-redux";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import Refresher from "../../components/Refresher";
import {toast} from "react-toastify";
import Moment from "react-moment";

class Tokens extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  fetch() {
    this.props.fetchData({
      url: "/api/tokens",
      respKey: "tokens",
    }, "TOKENS");
  }

  componentDidMount() {
    this.fetch();
  }

  getInitialState() {
    return {
    };
  }

  generateToken() {
    this.props.postData({
      url: "/api/tokens/",
      data: {}
    }, "TOKENS", () => {
      this.fetch();
      toast.success("Exito! Token creado.");
    }, () => {
      toast.error("Error!");
    });
  }

  getRefresher() {
    return <Refresher refreshFunction={this.fetch.bind(this)} refreshDate={this.props.lastUpdated}/>;
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
        <ReactTable
          data={this.props.state.tokens}
          filterable
          previousText='Anterior'
          nextText='Siguiente'
          loadingText='Cargando...'
          noDataText='No hay datos'
          pageText='Pagina'
          ofText='de'
          rowsText='filas'
          columns={[
            {
              columns: [
                {
                  Header: "ID",
                  accessor: "id"
                },
                {
                  Header: "Token",
                  accessor: "token"
                },
                {
                  Header: "Fecha de Creacion",
                  accessor: "date",
                  Cell: props => <Moment format="DD-MM-YYYY HH:mm" date={props.value}/>
                },
                {
                  Header: "Creado por",
                  accessor: "created_by.username"
                },
                {
                  Header: "Usado por",
                  accessor: "used_by.username"
                },
                {
                  Header: "Fecha de uso",
                  accessor: "used_on",
                  Cell: props => <Moment format="DD-MM-YYYY HH:mm" date={props.value}/>
                },
                {
                  Header: "Activo",
                  accessor: "is_active",
                  Cell: props => <span>{props.value ? <i className="fa fa-check-circle" style={{color:"green"}}/> : <i className="fa fa-times-circle" style={{color:"red"}}/>}</span>
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight text-center"
        />

        <br/>

        <Card>
          <CardHeader tag="h3"><i className="fa fa-gear"/> Operar</CardHeader>
          <CardBody>
            <Form>
              <FormGroup check row>
                <Col sm={12}>
                  <Button onClick={() => {this.generateToken()}} color="success"><i className="fa fa-plus"/> Generar Nuevo Token</Button>
                  <FormText color="muted">
                    Genera un nuevo token para que una agencia lo utilice.
                  </FormText>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        {this.getRefresher()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state.tokensData,
    isLoading: state.tokensIsLoading,
    hasErrored: state.tokensHasErrored,
    lastUpdated: state.tokensLastUpdated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (calls, section) => dispatch(fetchData(calls, section)),
    postData: (call, section, sc, fc) => dispatch(postData(call, section, sc, fc))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Tokens);
