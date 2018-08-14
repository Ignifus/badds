import React, { Component } from 'react';
import {
  Card, CardText, CardBody, CardHeader, CardSubtitle, Badge, Collapse,
  Alert
} from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { toast } from "react-toastify";
import Refresher from "../../components/Refresher";
import Spinner from "../../components/Spinner";
import {fetchData, postData} from "../../actions";
import {connect} from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.setInputState = this.setInputState.bind(this);
    this.setInputStateArray = this.setInputStateArray.bind(this);
    this.toggleQuestion = this.toggleQuestion.bind(this);
  }

  getInitialState() {
    return {
      questionCategories: [],
      questionGroups: [],
      collapses: [],
      formValid: true
    };
  }

  fetch() {
    this.props.fetchData({
      url: "/api/api/wiki",
      respKey: "questions",
      next: {
        url: "/api/api/questioncategories",
        respKey: "availableQuestionCategories"
      }
    }, "WIKI");
  }

  componentDidMount() {
    this.fetch();
  }

  getRefresher() {
    return <Refresher refreshFunction={this.fetch.bind(this)} refreshDate={this.props.lastUpdated}/>;
  }

  addQuestion() {
    this.validateForm();

    if (!this.state.formValid)
      return;

    this.props.postData({
      url: "/api/wiki/",
      data: {
        question:this.state.question,
        answer:this.state.answer,
        groups:this.state.questionGroups,
        categories:this.state.questionCategories
      }
    }, "WIKI", () => {
      this.fetch();
      toast.success("Exito! Pregunta agregada.");
    }, () => {
      toast.error("Error!");
    });

  }

  validateForm() {
    this.setFormValid(this.state.questionCategories.length > 0 && this.state.questionGroups.length > 0 && this.state.question && this.state.answer);
  }

  setFormValid(valid) {
    const state = this.state;
    state.formValid = valid;
    this.setState(state);
  }

  getFormAlert() {
    if (!this.state.formValid) {
      return (
        <Alert color="info">
          <i className="fa fa-exclamation-triangle"/> Recuerde que todos los campos deben estar completados.
        </Alert>
      );
    }
  }

  setInputState(event, stateKey) {
    const state = this.state;
    state[stateKey] = event.target.value;
    this.setState(state);
    this.validateForm();
  }

  setInputStateArray(event, stateKey) {
    const state = this.state;
    state[stateKey] = [...event.target.options].filter(o => o.selected).map(o => o.value);
    this.setState(state);
    this.validateForm();
  }

  toggleQuestion(id) {
    const state = this.state;
    state.collapses[id] = !state.collapses[id];
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
        {/*{this.props.state.questions.map((val) => {*/}
          {/*return <Card key={val.id}>*/}
            {/*<CardHeader><i className="fa fa-angle-double-down fa-lg" onClick={() => this.toggleQuestion(val.id)} style={{cursor: 'pointer'}}/>{val.question}</CardHeader>*/}
            {/*<Collapse isOpen={this.state.collapses[val.id]}>*/}
              {/*<CardBody>*/}
                {/*<CardText>{val.answer}</CardText>*/}
                {/*<CardSubtitle className="text-right">*/}
                  {/*{val.categories.map(function (val) {*/}
                    {/*return <Badge color="primary" key={val.id} pill>{val.category}</Badge>*/}
                  {/*})}*/}
                  {/*<br/>*/}
                  {/*{val.groups.map(function (val) {*/}
                    {/*return <Badge color="light" key={val.id} pill>{val.name}</Badge>*/}
                  {/*})}*/}
                {/*</CardSubtitle>*/}
              {/*</CardBody>*/}
            {/*</Collapse>*/}
          {/*</Card>;*/}
        {/*})}*/}

        <Card>
          <CardHeader tag="h3"><i className="fa fa-plus"/> Nueva pregunta</CardHeader>
          <CardBody>
            {this.getFormAlert()}
            <Form url="#">
              <FormGroup row>
                <Label for="question" sm={12}>Pregunta</Label>
                <Col sm={12}>
                  <Input name="question" id="question" placeholder="Ingrese titulo de pregunta" onChange={(e) => this.setInputState(e, "question")} />
                  <FormText color="muted">
                    Asegurese de agregar una pregunta concreta.
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="answer" sm={12}>Respuesta</Label>
                <Col sm={12}>
                  <Input type="textarea" name="text" id="answer" rows="4" onChange={(e) => this.setInputState(e, "answer")} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Label for="questionCategory">Categorias</Label>
                <Input type="select" multiple id="questionCategory" onChange={(e) => this.setInputStateArray(e, "questionCategories")} value={this.state.questionCategories}>
                  {/*{this.props.state.availableQuestionCategories.map(function (val) {*/}
                    {/*return <option key={val.id} value={val.id}>{val.category}</option>*/}
                  {/*})}*/}
                </Input>
                <FormText color="muted">
                  Mantenga la tecla CTRL para seleccionar multiples opciones.
                </FormText>
              </FormGroup>

              <FormGroup>
                <Label for="group">Grupos</Label>
                <Input type="select" multiple id="group" onChange={(e) => this.setInputStateArray(e, "questionGroups")} value={this.state.questionGroups}>
                  {/*{this.props.siteState.groups.map(function (val) {*/}
                    {/*return <option key={val.id} value={val.id}>{val.name}</option>*/}
                  {/*})}*/}
                </Input>
                <FormText color="muted">
                  Mantenga la tecla CTRL para seleccionar multiples opciones.
                </FormText>
              </FormGroup>

              <FormGroup row>
                <Col sm={12}>
                  <Button onClick={this.addQuestion.bind(this)} color="primary"><i className="fa fa-edit"/> Agregar</Button>
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
    state: state.wikiData,
    siteState: state.siteData,
    isLoading: state.wikiIsLoading,
    hasErrored: state.wikiHasErrored,
    lastUpdated: state.wikiLastUpdated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (calls, section) => dispatch(fetchData(calls, section)),
    postData: (call, section, successCallback, failCallback) => dispatch(postData(call, section, successCallback, failCallback))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Wiki);
