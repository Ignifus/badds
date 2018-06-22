import React, {Component} from 'react'

class ErrorMessage extends Component {
  render () {
    return (
      <div className="inner-center-absolute text-center" >
        <h1 style={{color: "red"}}><i className="fa fa-exclamation-triangle"/></h1>
        <h2>Error en el servidor</h2>
        <small>Por favor contacte al administrador del sistema con el siguiente mensaje</small>
        <pre><mark>{this.props.hasErrored}</mark></pre>
      </div>
    );
  }
}

export default ErrorMessage;
