import React, { Component } from 'react';
import {Card, CardText, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from "react-redux";
import Moment from "moment";
import SmartComponent, {mapDispatchToProps} from "../smart";

class Advertisements extends SmartComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
  }

  fetch() {
    this.props.fetchData({
      url: "/ads/api/badds",
      respKey: "ads",
    }, "ads");
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

  toggleConfirmModal() {
    const state = this.state;
    state.confirmModal = !this.state.confirmModal;
    this.setState(state);
  }

  renderContent() {
    return (
      <div>
        <ReactTable
          // data={}
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
                  <Input name="agency" id="agency" placeholder="Ingrese el identificador de la agencia." />
                  <FormText color="muted">
                    El identificador puede encontrarlo en la tabla superior.
                  </FormText>
                  <FormText color="muted">
                    Si esta activo, cambia a inactivo y viceversa.
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup check inline>
                <Button color="primary"><i className="fa fa-random"/> Cambiar estado</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        <Modal isOpen={this.state.confirmModal} toggle={this.toggleConfirmModal}>
          <ModalHeader toggle={this.toggleConfirmModal}>Confirmacion</ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button color="success">Confirmar</Button>{' '}
            <Button color="danger" onClick={() => this.toggleConfirmModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state.base.ads
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Advertisements);
