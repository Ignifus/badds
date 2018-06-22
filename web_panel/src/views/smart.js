import React, { Component } from 'react';
import Refresher from "../components/Refresher";
import Spinner from "../components/Spinner";
import {fetchData, postData} from "../actions";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

class SmartComponent extends Component {
  constructor(props) {
    super(props);
  }

  fetch() {

  }

  getRefresher() {
    return <Refresher refreshFunction={this.fetch.bind(this)} refreshDate={this.props.state.lastUpdated}/>;
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    if (this.props.state.hasErrored) {
      return (
        <div>
          <ErrorMessage hasErrored={this.props.state.hasErrored}/>
          {this.getRefresher()}
        </div>
      );
    }

    if (this.props.state.isLoading) {
      return <Spinner loading={true} refreshFunction={this.fetch.bind(this)} refreshDate={this.props.state.lastUpdated}/>
    }

    return (
      <div className="animated fadeIn">
        {this.renderContent()}
        {this.getRefresher()}
      </div>
    )
  }

  renderContent() {
    throw new Error('Unimplemented!');
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (calls, section) => dispatch(fetchData(calls, section)),
    postData: (call, section, sc, fc) => dispatch(postData(call, section, sc, fc))
  };
};

export default SmartComponent;
