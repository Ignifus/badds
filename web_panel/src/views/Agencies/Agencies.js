import React, { Component } from 'react';

import {Card, CardText, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import ReactTable from "react-table";
import "react-table/react-table.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Refresher from "../../components/Refresher";
import Spinner from "../../components/Spinner";
import {fetchData, postData, putData} from "../../actions";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import Moment from "moment";

class Agencies extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.setUserId = this.setUserId.bind(this);
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
  }

  fetch() {
    this.props.fetchData({
      url: "/api/agencies",
      respKey: "agencies",
    }, "AGENCIES");
  }

  componentDidMount() {
    this.fetch();
  }

  getInitialState() {
    return {
      userId: "",
      foundAgency: {
        user: {}
      },
      confirmModal: false
    };
  }

  getRefresher() {
    return <Refresher refreshFunction={this.fetch.bind(this)} refreshDate={this.props.lastUpdated}/>;
  }

  flipUserState() {
    let agency = this.props.state.agencies.find(o => o.id.toString() === this.state.userId);

    if (!agency) {
      toast.error("Agencia no encontrada.");
      return;
    }

    this.setFoundAgency(agency);

    this.toggleConfirmModal();
  }

  performUserStateFlip() {
    this.props.putData({
      url:"/api/users/" + this.state.foundAgency.user.id + "/",
      data:
        {
          is_active: !this.state.foundAgency.user.is_active
        }}, "AGENCIES", () => {
      this.fetch();
      this.setState(this.getInitialState());
      toast.success("Exito! Usuario " + (this.state.foundAgency.user.is_active ? "desactivado." : "activado."));
    }, () => {
      toast.error("Error!")
    });

    this.toggleConfirmModal();
  }

  setFoundAgency(agency) {
    const state = this.state;
    state.foundAgency = agency;
    this.setState(state);
  }

  setUserId(event) {
    const state = this.state;
    state.userId = event.target.value;
    this.setState(state);
  }

  toggleConfirmModal() {
    const state = this.state;
    state.confirmModal = !this.state.confirmModal;
    this.setState(state);
  }

  render() {
    if (this.props.hasErrored) {
      return (
        <div>
          <ErrorMessage hasErrored={this.props.hasErrored}/>
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
          data={this.props.state.agencies}
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
                  Header: "Agencia",
                  accessor: "user.username"
                },
                {
                  Header: "Logo",
                  accessor: "logo",
                  Cell: props => <img style={{height:"30px"}} src={props.value}/>
                },
                {
                  Header: "E-Mail",
                  accessor: "user.email"
                },
                {
                  Header: "Pais",
                  accessor: "country"
                },
                {
                  Header: "Provincia",
                  accessor: "province"
                },
                {
                  Header: "Direccion",
                  accessor: "address"
                },
                {
                  Header: "Telefono",
                  accessor: "phone"
                },
                {
                  Header: "ID de Token",
                  accessor: "user.token"
                },
                {
                  Header: "Ultimo Pago",
                  accessor: "last_paid",
                  Cell: props => <Moment format="DD-MM-YYYY HH:mm" date={props.value}/>
                },
                {
                  Header: "Activo",
                  accessor: "user.is_active",
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
              <FormGroup row>
                <Label for="agency" sm={12}>ID de Agencia</Label>
                <Col sm={12}>
                  <Input name="agency" id="agency" placeholder="Ingrese el identificador de la agencia." onChange={(e) => this.setUserId(e)} value={this.state.userId} />
                  <FormText color="muted">
                    El identificador puede encontrarlo en la tabla superior.
                  </FormText>
                  <FormText color="muted">
                    Si esta activo, cambia a inactivo y viceversa.
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup check inline>
                <Button color="primary" onClick={() => {this.flipUserState()}}><i className="fa fa-random"/> Cambiar estado</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        <Modal isOpen={this.state.confirmModal} toggle={this.toggleConfirmModal}>
          <ModalHeader toggle={this.toggleConfirmModal}>Confirmacion</ModalHeader>
          <ModalBody>
            Esta seguro que quiere {this.state.foundAgency.user.is_active ? "desactivar" : "activar"} a la agencia de ID {this.state.foundAgency.id} y nombre {this.state.foundAgency.user.username}?
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.performUserStateFlip()}>Confirmar</Button>{' '}
            <Button color="danger" onClick={() => this.toggleConfirmModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {this.getRefresher()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state.agenciesData,
    isLoading: state.agenciesIsLoading,
    hasErrored: state.agenciesHasErrored,
    lastUpdated: state.agenciesLastUpdated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (calls, section) => dispatch(fetchData(calls, section)),
    putData: (call, section, sc, fc) => dispatch(putData(call, section, sc, fc))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Agencies);
